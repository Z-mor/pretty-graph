import { EventDispatcher, PerspectiveCamera } from 'three';
export declare class PrettyGraphControls extends EventDispatcher {
    enabled: boolean;
    scale: number;
    private _camera;
    private _zoom;
    private _selection;
    private _onResize;
    constructor(camera: PerspectiveCamera, container: HTMLElement | HTMLDocument);
    init(): void;
    setTransform(position: {
        x: number;
        y: number;
    }): void;
    dispose(): void;
    private _onRotate;
    private _onContextMenu;
    private _onMouseMove;
    private _onMouseDown;
    private _onDblClick;
    private _onClick;
    private _onMouseUp;
    private _zoomHandler;
    private _getScaleFromZ;
    private _getZFromScale;
    private _toRadians;
}
