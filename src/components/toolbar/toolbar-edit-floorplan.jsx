import {Vertice1_ID, Vertice2_ID, Vertice3_ID, Vertice4_ID} from '../../constants';


export let defaultPlan = {
  "unit": "cm",
  "layers": {
    "layer-1": {
      "id": "layer-1",
      "altitude": 0,
      "order": 0,
      "opacity": 1,
      "name": "default",
      "visible": true,
      "vertices": {
        "SyeqgxXrR7": {
          "id": "SyeqgxXrR7",
          "type": "",
          "prototype": "vertices",
          "name": "Vertex",
          "misc": {},
          "selected": false,
          "properties": {},
          "visible": true,
          "x": 100, "y": 3900,
          "lines": ["r1qllXHAm", "rJwblQrA7"],
          "areas": []
        },
        "H1b9leXrCQ": {
          "id": "H1b9leXrCQ",
          "type": "",
          "prototype": "vertices",
          "name": "Vertex",
          "misc": {},
          "selected": false,
          "properties": {},
          "visible": true,
          "x": 600,
          "y": 3900,
          "lines": ["r1qllXHAm", "BkbZe7rRX"],
          "areas": []
        },
        "r1ebbxXrCQ": {
          "id": "r1ebbxXrCQ",
          "type": "",
          "prototype": "vertices",
          "name": "Vertex",
          "misc": {},
          "selected": false,
          "properties": {},
          "visible": true,
          "x": 600,
          "y": 3400,
          "lines": ["BkbZe7rRX", "ByrEbxXBRQ"],
          "areas": []
        },
        "ryLV-lXH0X": {
          "id": "ryLV-lXH0X",
          "type": "",
          "prototype": "vertices",
          "name": "Vertex",
          "misc": {},
          "selected": false,
          "properties": {},
          "visible": true,
          "x": 100,
          "y": 3400,
          "lines": ["ByrEbxXBRQ", "rJwblQrA7"],
          "areas": []
        }
      },
      "lines": {
        "r1qllXHAm": {
          "id": "r1qllXHAm",
          "type": "wall",
          "prototype": "lines",
          "name": "Wall",
          "misc": { "_unitLength": "cm" },
          "selected": false,
          "properties": {
            "height": { "length": 300 },
            "thickness": { "length": 20 },
            "textureA": "bricks",
            "textureB": "bricks"
          },
          "visible": true,
          "vertices": ["SyeqgxXrR7", "H1b9leXrCQ"],
          "holes": []
        },
        "BkbZe7rRX": {
          "id": "BkbZe7rRX",
          "type": "wall",
          "prototype": "lines",
          "name": "Wall",
          "misc": {},
          "selected": false,
          "properties": {
            "height": { "length": 300 },
            "thickness": { "length": 20 },
            "textureA": "bricks",
            "textureB": "bricks"
          },
          "visible": true,
          "vertices": ["r1ebbxXrCQ", "H1b9leXrCQ"],
          "holes": []
        },
        "ByrEbxXBRQ": {
          "id": "ByrEbxXBRQ",
          "type": "wall",
          "prototype": "lines",
          "name": "Wall",
          "misc": { "_unitLength": "cm" },
          "selected": false,
          "properties": {
            "height": { "length": 300 },
            "thickness": { "length": 20 },
            "textureA": "bricks", "textureB": "bricks"
          },
          "visible": true,
          "vertices": ["ryLV-lXH0X", "r1ebbxXrCQ"],
          "holes": []
        },
        "rJwblQrA7": {
          "id": "rJwblQrA7",
          "type": "wall",
          "prototype": "lines",
          "name": "Wall",
          "misc": {},
          "selected": false,
          "properties": {
            "height": { "length": 300 },
            "thickness": { "length": 20 },
            "textureA": "bricks",
            "textureB": "bricks"
          },
          "visible": true,
          "vertices": ["ryLV-lXH0X", "SyeqgxXrR7"],
          "holes": []
        }
      },
      "holes": {},
      "areas": {
        "H1gDZlXSCQ": {
          "id": "H1gDZlXSCQ",
          "type": "area",
          "prototype": "areas",
          "name": "Area",
          "misc": {},
          "selected": false,
          "properties": {
            "patternColor": "#F5F4F4",
            "thickness": { "length": 0 },
            "texture": "none"
          },
          "visible": true,
          "vertices": ["SyeqgxXrR7", "ryLV-lXH0X", "r1ebbxXrCQ", "H1b9leXrCQ"],
          "holes": []
        }
      },
      "items": {},
      "selected": { "vertices": [], "lines": [], "holes": [], "areas": [], "items": [] }
    }
  },
  "grids": {
    "h1": {
      "id": "h1",
      "type": "horizontal-streak",
      "properties": {
        "step": 20,
        "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"]
      }
    },
    "v1": {
      "id":
        "v1",
      "type": "vertical-streak",
      "properties": {
        "step": 20,
        "colors": ["#808080", "#ddd", "#ddd", "#ddd", "#ddd"]
      }
    }
  },
  "selectedLayer": "layer-1",
  "groups": {},
  "width": 4000,
  "height": 4000,
  "meta": {},
  "guides": { "horizontal": {}, "vertical": {}, "circular": {} }
}


export const calculatePosition = (defaultPlan, width, height, wallHeight) => {
  let vertice1 = defaultPlan.layers["layer-1"].vertices[Vertice1_ID]
  let vertice2 = defaultPlan.layers["layer-1"].vertices[Vertice2_ID]
  let vertice3 = defaultPlan.layers["layer-1"].vertices[Vertice3_ID]
  let vertice4 = defaultPlan.layers["layer-1"].vertices[Vertice4_ID]
  const lines = defaultPlan.layers["layer-1"].lines

  for (let key in lines)
    lines[key].properties.height.length = wallHeight * 0.1

  vertice2.x = vertice1.x + (width * 0.1)
  vertice3.x = vertice2.x
  vertice3.y = vertice1.y - (height * 0.1)
  vertice4.y = vertice3.y
}
