import { EventEmitter } from './emitter';
import { GraphOptions } from './options';
export declare class PretyGraph {
    onEvent: EventEmitter;
    private _camera;
    private _scene;
    private _options;
    private _renderer;
    private _container;
    private _fov;
    private _far;
    private _nodes;
    private _edges;
    private _nodesMaterial;
    private _nodesGeometry;
    private _animationFrameRequestId;
    private _nodeTranslateAttribute;
    private _nodeColorAttribute;
    private _center;
    private _controls;
    private _pickingNodesScene;
    private _pickingTexture;
    private _nodesPickingMaterial;
    private _nodesPickingGeometry;
    private _nodeMesh;
    private _nodesPickingsMesh;
    private _hoveredNode;
    private _hoveredNodeID;
    private _dragInProgress;
    private _dragging;
    private _plane;
    private _raycaster;
    private _intersection;
    private _offset;
    private _textureCanvas;
    private _textureWidth;
    private _textureHeight;
    private _textureIndex;
    private _nodeImageToIndex;
    private _textureMap;
    private _lineGeometry;
    private _lineMaterial;
    private _lineMesh;
    constructor(options: GraphOptions);
    options: GraphOptions;
    setData(data: any): void;
    stopRenderLoop(): void;
    resuleRenderLoop(): void;
    destroy(): void;
    private _disposeMesh;
    private _disposeGeometries;
    private _disposeRenderer;
    private _disposeMaterials;
    private _disposeTextures;
    private _testNode;
    private _setNodeColor;
    private _translateCoordinates;
    private _drawNodes;
    private _drawEdges;
    private _drawArrows;
    private _setupScene;
    private _setupCamera;
    private _setupRenderer;
    private _renderLoop;
    private _createTextureMap;
    private _loadImage;
    private _constructLines;
}
