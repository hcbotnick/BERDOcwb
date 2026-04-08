
const targetDate = new Date("January 1, 2050 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "Time's up!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        document.getElementById("days").innerHTML = days + "<span class='label'>Days</span>";
        document.getElementById("hours").innerHTML = hours + "<span class='label'>Hours</span>";
        document.getElementById("minutes").innerHTML = minutes + "<span class='label'>Minutes</span>";
        document.getElementById("seconds").innerHTML = seconds + "<span class='label'>Seconds</span>";
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

const slider = document.getElementById('hzTimeline');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
isDown = true;
startX = e.pageX - slider.offsetLeft;
scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
isDown = false;
});

slider.addEventListener('mouseup', () => {
isDown = false;
});

slider.addEventListener('mousemove', (e) => {
if (!isDown) return;
e.preventDefault();
const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
slider.scrollLeft = scrollLeft - walk;
});


!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).scrollama=t()}(this,function(){"use strict";function k({id:e,step:t,marginTop:o}){var{index:n,height:t}=t,n=`scrollama__debug-step--${e}-${n}`;let r=document.querySelector(`.${n}`);r=r||function(e){const t=document.createElement("div");t.className=`scrollama__debug-step ${e}`,t.style.position="fixed",t.style.left="0",t.style.width="100%",t.style.zIndex="9999",t.style.borderTop="2px solid black",t.style.borderBottom="2px solid black";const o=document.createElement("p");return o.style.position="absolute",o.style.left="0",o.style.height="1px",o.style.width="100%",o.style.borderTop="1px dashed black",t.appendChild(o),document.body.appendChild(t),t}(n),r.style.top=`${-1*o}px`,r.style.height=`${t}px`,r.querySelector("p").style.top=`${t/2}px`}function M(e){console.error(`scrollama error: ${e}`)}function q(e){return+e.getAttribute("data-scrollama-index")}function O(e){if("string"==typeof e&&0<e.indexOf("px")){var t=+e.replace("px","");return isNaN(t)?(err("offset value must be in 'px' format. Fallback to 0.5."),{format:"percent",value:.5}):{format:"pixels",value:t}}return"number"!=typeof e&&isNaN(+e)?null:(1<e&&err("offset value is greater than 1. Fallback to 1."),e<0&&err("offset value is lower than 0. Fallback to 0."),{format:"percent",value:Math.min(Math.max(0,e),1)})}let A,N,T;function z(e){e=e?e.scrollTop:window.pageYOffset;A!==e&&(A=e,A>N?T="down":A<N&&(T="up"),N=A)}return function(){let r={},i=function(){var t="abcdefghijklmnopqrstuvwxyz",e=Date.now();const o=[];for(let e=0;e<6;e+=1){var n=t[Math.floor(Math.random()*t.length)];o.push(n)}return`${o.join("")}${e}`}(),f=[],p,u,d,h=0,t=!1,g=!1,m=!1,v=!1,n=[];function x(){r={stepEnter:()=>{},stepExit:()=>{},stepProgress:()=>{}},n=[]}function b(e){e&&!t&&$(),!e&&t&&y(),t=e}function s(e,t){var o=q(e);const n=f[o];void 0!==t&&(n.progress=t);t={element:e,index:o,progress:t,direction:T};"enter"===n.state&&r.stepProgress(t)}function o([e]){var t=q(e.target);const o=f[t];e=e.target.offsetHeight;e!==o.height&&(o.height=e,l(o),w(o),E(o))}function a([e]){z(u);var{isIntersecting:t,target:e}=e;(t?function(e){var t=q(e);const o=f[t];e={element:e,index:t,direction:T},o.direction=T,o.state="enter",n[t]||r.stepEnter(e),v&&(n[t]=!0)}:function(e){var t=q(e);const o=f[t];o.state&&(t={element:e,index:t,direction:T},g&&("down"===T&&o.progress<1?s(e,1):"up"===T&&0<o.progress&&s(e,0)),o.direction=T,o.state="exit",r.stepExit(t))})(e)}function c([e]){var t=q(e.target),o=f[t],{isIntersecting:n,intersectionRatio:t,target:e}=e;n&&"enter"===o.state&&s(e,t)}function l({observers:t}){Object.keys(t).map(e=>{t[e].disconnect()})}function y(){f.forEach(l)}function E(e){const t=new ResizeObserver(o);t.observe(e.node),e.observers.resize=t}function w(e){var t=window.innerHeight,o=e.offset||p,n="pixels"===o.format?1:t,r=o.value*n,o=e.height/2-r,n=e.height/2-(t-r),t=`${o}px 0px ${n}px 0px`,r=d;const s=new IntersectionObserver(a,{rootMargin:t,threshold:.5,root:r});s.observe(e.node),e.observers.step=s,m&&k({id:i,step:e,marginTop:o,marginBottom:n})}function e(e){var t=window.innerHeight,o=e.offset||p,n="pixels"===o.format?1:t,n=o.value*n,n=`${-n+e.height}px 0px ${n-t}px 0px`,t=function(e,t){var o=Math.ceil(e/t);const n=[];var r=1/o;for(let e=0;e<o+1;e+=1)n.push(e*r);return n}(e.height,h);const r=new IntersectionObserver(c,{rootMargin:n,threshold:t});r.observe(e.node),e.observers.progress=r}function $(){y(),f.forEach(E),f.forEach(w),g&&f.forEach(e)}const S={};return S.setup=({step:e,parent:t,offset:o=.5,threshold:n=4,progress:r=!1,once:s=!1,debug:i=!1,container:a=void 0,root:c=null})=>{var l;return l=a,A=0,N=0,document.addEventListener("scroll",()=>z(l)),f=([e,t=document]=[e,t],("string"==typeof e?Array.from(t.querySelectorAll(e)):e instanceof Element?[e]:e instanceof NodeList?Array.from(e):e instanceof Array?e:[]).map((e,t)=>({index:t,direction:void 0,height:e.offsetHeight,node:e,observers:{},offset:O(e.dataset.offset),top:function(e){var{top:e}=e.getBoundingClientRect();return e+window.pageYOffset-(document.body.clientTop||0)}(e),progress:0,state:void 0}))),f.length?(g=r,v=s,m=i,h=Math.max(1,+n),p=O(o),u=a,d=c,x(),f.forEach(e=>e.node.setAttribute("data-scrollama-index",e.index)),b(!0)):M("no step elements"),S},S.enable=()=>(b(!0),S),S.disable=()=>(b(!1),S),S.destroy=()=>(b(!1),x(),S),S.resize=()=>($(),S),S.offset=e=>null==e?p.value:(p=O(e),$(),S),S.onStepEnter=e=>("function"==typeof e?r.stepEnter=e:M("onStepEnter requires a function"),S),S.onStepExit=e=>("function"==typeof e?r.stepExit=e:M("onStepExit requires a function"),S),S.onStepProgress=e=>("function"==typeof e?r.stepProgress=e:M("onStepProgress requires a function"),S),S}});

//MAP

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

    function setLayerOpacity(layerConfig) {
        var paintProps = getLayerPaintType(layerConfig.layer);
        if (!paintProps) {
            return;
        }

        paintProps.forEach(function (prop) {
            var options = {};
            if (layerConfig.duration) {
                var transitionProp = prop + '-transition';
                options = { duration: layerConfig.duration };
                map.setPaintProperty(layerConfig.layer, transitionProp, options);
            }
            map.setPaintProperty(layerConfig.layer, prop, layerConfig.opacity, options);
        });
    }

    var scroller = scrollama();

    map.on('load', function () {
        if (!config.use3dTerrain) {
            map.setTerrain(null);
        }

        if (config.use3dTerrain) {
            map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
            });

            map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
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
                    chapter.onChapterEnter.forEach(setLayerOpacity);
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
                    chapter.onChapterExit.forEach(setLayerOpacity);
                }
            });

        if (config.auto) {
            var first = document.querySelector('[data-scrollama-index="0"]');
            if (first) {
                first.scrollIntoView();
            }
        }
    });
})();
