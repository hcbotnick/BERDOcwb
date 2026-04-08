var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // leave commented to use Mapbox Standard Style
    accessToken: 'pk.eyJ1IjoiaGJvdG5pY2siLCJhIjoiY21uMmlocGUyMTNvbTJxcHhvNWNqaWJyaSJ9.0DJO74tWcRgyHQq3G3i0aw',
    style: 'mapbox://styles/hbotnick/cmmofidyp004r01s19oyacgxp',
    
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    
    insetPosition: 'bottom-right',
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    footer: 'Visualization by Hayes Botnick. Data by the City of Boston.',
    chapters: [
        {
            id: 'first-chapter',
            alignment: 'center',
            layerMatch: 'Names',
            visibility: 'none',
            layerMatch: 'MATEP',
            visibility: 'none',
            hidden: false,
            description: 'On this map, buildings with good EnergyStar scores are colored <span class="legend" style="background-color: #3eb11b"> green,</span> those with moderate scores are <span class="legend" style="background-color: #eed13f">yellow.</span> The buildings in <span class="legend" style="background-color: #e51f1f">red</span> have the worst ratings and many of Boston’s hospitals fall in this category, averaging an Energy Star score of 54.',
                //close up map of city
            location: {
                center: [-71.106781, 42.336131],
                zoom: 13,
                pitch: 60.5,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
                {
                layer: 'layer-name',
                opacity: .5
                }
            ],
            onChapterExit: [
                {
                opacity: 1,
                duration: 5000
                }
            ]
        },
        {
            id: 'second-chapter',
            alignment: 'center',
            layerMatch: 'MATEP',
            visibility: 'none',
            hidden: false,
            description: 'Several medical facilities rank far lower than that. Brigham and Women’s Faulkner Hospital in Jamaica Plain received a score of 1 out of 100, the lowest possible rating. What many of these hospitals with poor scores have in common is specialized infrastructure, like generators for operating rooms, that draw more power 24 hours a day.',
            //zoom to Faulkner
            location: {
                center: [-71.106781, 42.336131],
                zoom: 15,
                pitch: 75,
                bearing: -9.6
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
        },
        {
            id: 'third-chapter',
            alignment: 'center',
            layerMatch: 'Names',
            visibility: 'visible',
            hidden: false,
            description: 'Boston Children’s Hospital received a score of 18. “Being a hospital, we have so much going on that just happens to be fairly energy-intensive compared with almost any other type of building,” explains Brian Smith, senior manager of energy, building systems, and sustainability.',
            //zoom to childrens hospital
            location: {
                center: [-71.104963, 42.337412],
                zoom: 16,
                pitch: 60,
                bearing: -133
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                layer: 'layer-name',
                opacity: .5
                }
            ],
            onChapterExit: [
                {
                layer: 'layer-name',
                opacity: 1,
                duration: 5000
                }
            ]
        },
        {
            id: 'fourth-chapter',
            alignment: 'center',
            hidden: false,
            //pull back slightly to show Longwood medical area labelling the hospital names and their scores on the map) 
            description: 'Children’s and the other hospitals in the Longwood Medical Area draw their power from a common generating plant, MATEP. With its reliance on diesel and other highly polluting energy sources, the plant results in low ratings for the facilities that rely on it for power.',
            location: {
                center: [-71.104963, 42.337412],
                zoom: 14,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                layer: 'layer-name',
                opacity: .5
                }
            ],
            onChapterExit: [
                {
                layer: 'layer-name',
                opacity: 1,
                duration: 5000
                }
            ]
        },
        {
            id: 'fifth-chapter',
            alignment: 'center',
            hidden: false,
            description: 'Not all hospitals in Boston fall at the bottom of the rankings. Franciscan Children’s Hospital in Brighton received the highest possible score of 100. As a specialized pediatric rehabilitation and behavioral health facility, it does not operate the energy-intensive services of a large acute-care complex. “Franciscan is mostly a chronic care hospital. They’re providing care to children who are chronically ill. They don’t have an emergency room, and when patients need surgery, they are often sent to other hospitals, like Boston Children’s,” said Leann Canty.',            
                location: {
                center: [-71.14353, 42.35003],
                zoom: 16,
                pitch: 64.5,
                bearing: -172
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                layer: 'layer-name',
                opacity: .5
                }
            ],
            onChapterExit: [
                {
                layer: 'layer-name',
                opacity: 1,
                duration: 5000
                }
            ]
        }
    ]}