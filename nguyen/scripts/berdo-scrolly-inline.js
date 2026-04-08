(function () {
    if (typeof mapboxgl === 'undefined' || typeof scrollama === 'undefined' || typeof config === 'undefined') {
        return;
    }

    var scrollyRoot = document.getElementById('berdo-scrolly');
    var storyRoot = document.getElementById('berdo-scrolly-story');
    if (!scrollyRoot || !storyRoot) {
        return;
    }

    var alignments = {
        left: 'berdo-align-left',
        center: 'berdo-align-center',
        right: 'berdo-align-right',
        full: 'berdo-align-full'
    };

    var layerTypes = {
        fill: ['fill-opacity'],
        line: ['line-opacity'],
        circle: ['circle-opacity', 'circle-stroke-opacity'],
        symbol: ['icon-opacity', 'text-opacity'],
        raster: ['raster-opacity'],
        'fill-extrusion': ['fill-extrusion-opacity'],
        heatmap: ['heatmap-opacity']
    };

    var features = document.createElement('div');
    features.id = 'berdo-scrolly-features';

    var header = document.createElement('div');
    header.className = 'berdo-scrolly-header';

    if (config.title) {
        var title = document.createElement('h1');
        title.textContent = config.title;
        header.appendChild(title);
    }

    if (config.subtitle) {
        var subtitle = document.createElement('h2');
        subtitle.textContent = config.subtitle;
        header.appendChild(subtitle);
    }

    if (config.byline) {
        var byline = document.createElement('p');
        byline.textContent = config.byline;
        header.appendChild(byline);
    }

    if (header.childElementCount > 0) {
        storyRoot.appendChild(header);
    }

    config.chapters.forEach(function (chapterConfig, idx) {
        var step = document.createElement('div');
        step.id = chapterConfig.id;
        step.className = 'berdo-scrolly-step ' + (alignments[chapterConfig.alignment] || 'berdo-align-center');

        if (chapterConfig.hidden) {
            step.classList.add('is-hidden');
        }
        if (idx === 0) {
            step.classList.add('active');
        }

        var card = document.createElement('div');
        card.className = 'berdo-scrolly-step-card';

        if (chapterConfig.title) {
            var cardTitle = document.createElement('h3');
            cardTitle.textContent = chapterConfig.title;
            card.appendChild(cardTitle);
        }

        if (chapterConfig.image) {
            var image = new Image();
            image.src = chapterConfig.image;
            image.style.display = 'block';
            image.style.maxWidth = '100%';
            image.style.height = 'auto';
            image.style.margin = '16px auto';
            card.appendChild(image);
        }

        if (chapterConfig.description) {
            var cardDesc = document.createElement('p');
            cardDesc.innerHTML = chapterConfig.description;
            card.appendChild(cardDesc);
        }

        step.appendChild(card);
        features.appendChild(step);
    });

    storyRoot.appendChild(features);

    if (config.footer) {
        var footer = document.createElement('div');
        footer.className = 'berdo-scrolly-footer';
        var footerText = document.createElement('p');
        footerText.innerHTML = config.footer;
        footer.appendChild(footerText);
        storyRoot.appendChild(footer);
    }

    mapboxgl.accessToken = config.accessToken;
    var map = new mapboxgl.Map({
        container: 'berdo-scrolly-map',
        style: config.style,
        center: config.chapters[0].location.center,
        zoom: config.chapters[0].location.zoom,
        bearing: config.chapters[0].location.bearing,
        pitch: config.chapters[0].location.pitch,
        interactive: false,
        projection: config.projection
    });

    var marker = null;
    if (config.showMarkers) {
        marker = new mapboxgl.Marker({ color: config.markerColor || '#3FB1CE' })
            .setLngLat(config.chapters[0].location.center)
            .addTo(map);
    }

    function getLayerPaintType(layerId) {
        var layer = map.getLayer(layerId);
        if (!layer) {
            return null;
        }
        return layerTypes[layer.type];
    }

    function resolveTargetLayerIds(layerConfig) {
        var style = map.getStyle();
        var styleLayerIds = Array.isArray(style && style.layers)
            ? style.layers.map(function (layer) { return layer.id; })
            : [];

        if (Array.isArray(layerConfig.layers) && layerConfig.layers.length > 0) {
            return layerConfig.layers.filter(function (id) {
                return map.getLayer(id);
            });
        }

        if (layerConfig.layer && map.getLayer(layerConfig.layer)) {
            return [layerConfig.layer];
        }

        if (typeof layerConfig.layerPrefix === 'string' && layerConfig.layerPrefix.length > 0) {
            return styleLayerIds.filter(function (id) {
                return id.indexOf(layerConfig.layerPrefix) === 0 && map.getLayer(id);
            });
        }

        if (typeof layerConfig.layerMatch === 'string' && layerConfig.layerMatch.length > 0) {
            return styleLayerIds.filter(function (id) {
                return id.indexOf(layerConfig.layerMatch) !== -1 && map.getLayer(id);
            });
        }

        return [];
    }

    function setLayerOpacity(layerConfig, targetLayerIds) {
        targetLayerIds.forEach(function (layerId) {
            var paintProps = getLayerPaintType(layerId);
            if (!paintProps) {
                return;
            }

            paintProps.forEach(function (prop) {
                var options = {};
                if (layerConfig.duration) {
                    var transitionProp = prop + '-transition';
                    options = { duration: layerConfig.duration };
                    map.setPaintProperty(layerId, transitionProp, options);
                }
                map.setPaintProperty(layerId, prop, layerConfig.opacity, options);
            });
        });
    }

    function setLayerVisibility(layerConfig, targetLayerIds) {
        var visibility = layerConfig.visibility;
        if (visibility !== 'visible' && visibility !== 'none') {
            return;
        }

        targetLayerIds.forEach(function (layerId) {
            map.setLayoutProperty(layerId, 'visibility', visibility);
        });
    }

    function applyChapterAction(layerConfig) {
        if (!layerConfig) {
            return;
        }

        var hasLayerSelector = !!layerConfig.layer ||
            (Array.isArray(layerConfig.layers) && layerConfig.layers.length > 0) ||
            !!layerConfig.layerPrefix ||
            !!layerConfig.layerMatch;

        var hasExplicitAction = typeof layerConfig.opacity === 'number' || typeof layerConfig.visibility === 'string';
        var normalizedConfig = layerConfig;

        // Default behavior: targeted layers are visible unless explicitly hidden/faded.
        if (hasLayerSelector && !hasExplicitAction) {
            normalizedConfig = Object.assign({}, layerConfig, { visibility: 'visible' });
        }

        var targetLayerIds = resolveTargetLayerIds(normalizedConfig);
        if (targetLayerIds.length === 0) {
            console.warn('No map layers matched chapter action:', normalizedConfig);
            return;
        }

        if (typeof normalizedConfig.opacity === 'number') {
            setLayerOpacity(normalizedConfig, targetLayerIds);
        }

        if (typeof normalizedConfig.visibility === 'string') {
            setLayerVisibility(normalizedConfig, targetLayerIds);
        }
    }

    function chapterHasInlineLayerAction(chapter) {
        if (!chapter) {
            return false;
        }

        var hasLayerSelector = !!chapter.layer ||
            (Array.isArray(chapter.layers) && chapter.layers.length > 0) ||
            !!chapter.layerPrefix ||
            !!chapter.layerMatch;

        return hasLayerSelector;
    }

    var scroller = scrollama();

    function syncTerrainState() {
        var style = map.getStyle();
        if (!style) {
            return;
        }

        if (!config.use3dTerrain) {
            map.setTerrain(null);

            if (typeof map.setFog === 'function') {
                map.setFog(null);
            }

            style.layers
                .filter(function (layer) {
                    return layer.type === 'sky';
                })
                .forEach(function (layer) {
                    if (map.getLayer(layer.id)) {
                        map.removeLayer(layer.id);
                    }
                });

            Object.keys(style.sources || {}).forEach(function (sourceId) {
                var source = style.sources[sourceId];
                if (source && source.type === 'raster-dem' && map.getSource(sourceId)) {
                    map.removeSource(sourceId);
                }
            });

            return;
        }

        if (!map.getSource('mapbox-dem')) {
            map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
            });
        }

        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        if (!map.getLayer('sky')) {
            map.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });
        }
    }

    map.on('load', function () {
        syncTerrainState();

        scroller
            .setup({
                step: '#berdo-scrolly .berdo-scrolly-step',
                offset: 0.6,
                progress: true,
                container: storyRoot
            })
            .onStepEnter(function (response) {
                var chapterIndex = config.chapters.findIndex(function (chap) {
                    return chap.id === response.element.id;
                });

                if (chapterIndex < 0) {
                    return;
                }

                var chapter = config.chapters[chapterIndex];
                var chapterLocation = {
                    center: chapter.location.center,
                    zoom: chapter.location.zoom,
                    bearing: chapter.location.bearing,
                    pitch: chapter.location.pitch,
                    essential: true
                };

                if (chapter.rotateAnimation) {
                    map.once('moveend', function () {
                        var rotateNumber = map.getBearing();
                        map.rotateTo(rotateNumber + 180, {
                            duration: 30000,
                            essential: true,
                            easing: function (t) {
                                return t;
                            }
                        });
                    });
                }

                response.element.classList.add('active');
                map[chapter.mapAnimation || 'flyTo'](chapterLocation);

                if (marker) {
                    marker.setLngLat(chapter.location.center);
                }

                if (Array.isArray(chapter.onChapterEnter) && chapter.onChapterEnter.length > 0) {
                    chapter.onChapterEnter.forEach(applyChapterAction);
                }

                // Allow concise chapter-level layer rules without wrapping in onChapterEnter.
                if (chapterHasInlineLayerAction(chapter)) {
                    applyChapterAction(chapter);
                }

                if (chapter.callback && typeof window[chapter.callback] === 'function') {
                    window[chapter.callback]();
                }

                if (config.auto) {
                    var nextChapter = (chapterIndex + 1) % config.chapters.length;
                    map.once('moveend', function () {
                        var nextEl = document.querySelector('[data-scrollama-index="' + nextChapter.toString() + '"]');
                        if (nextEl) {
                            nextEl.scrollIntoView();
                        }
                    });
                }
            })
            .onStepExit(function (response) {
                var chapter = config.chapters.find(function (chap) {
                    return chap.id === response.element.id;
                });

                response.element.classList.remove('active');
                if (chapter && Array.isArray(chapter.onChapterExit) && chapter.onChapterExit.length > 0) {
                    chapter.onChapterExit.forEach(applyChapterAction);
                }
            });

        if (config.auto) {
            var first = document.querySelector('[data-scrollama-index="0"]');
            if (first) {
                first.scrollIntoView();
            }
        }
    });

    map.on('style.load', syncTerrainState);
})();
