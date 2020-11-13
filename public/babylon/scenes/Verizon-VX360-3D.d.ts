declare module PROJECT {
    /**
     * Babylon universal camera rig system pro class
     * @class UniversalCameraSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class UniversalCameraSystem extends BABYLON.ScriptComponent {
        protected static PlayerOneCamera: BABYLON.UniversalCamera;
        protected static PlayerTwoCamera: BABYLON.UniversalCamera;
        protected static PlayerThreeCamera: BABYLON.UniversalCamera;
        protected static PlayerFourCamera: BABYLON.UniversalCamera;
        protected static XRExperienceHelper: BABYLON.WebXRDefaultExperience;
        private static multiPlayerView;
        private static multiPlayerCount;
        private static multiPlayerCameras;
        private static stereoCameras;
        private static startupMode;
        private static cameraReady;
        private static renderingPipeline;
        static GetRenderingPipeline(): BABYLON.DefaultRenderingPipeline;
        static IsCameraSystemReady(): boolean;
        private mainCamera;
        private cameraType;
        private cameraInertia;
        private cameraController;
        private virtualReality;
        private arcRotateConfig;
        private multiPlayerSetup;
        private editorPostProcessing;
        isMainCamera(): boolean;
        getCameraType(): number;
        protected m_cameraRig: BABYLON.TargetCamera;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeCameraSystemState(): void;
        protected startCameraSystemState(): Promise<void>;
        protected updateCameraSystemState(): void;
        protected destroyCameraSystemState(): void;
        /** Get the WebXR default experience helper */
        static GetWebXR(): BABYLON.WebXRDefaultExperience;
        /** Get universal camera rig for desired player */
        static GetPlayerCamera(scene: BABYLON.Scene, player?: BABYLON.PlayerNumber, detach?: boolean): BABYLON.UniversalCamera;
        /** Get camera transform node for desired player */
        static GetCameraTransform(scene: BABYLON.Scene, player?: BABYLON.PlayerNumber): BABYLON.TransformNode;
        /** Are stereo side side camera services available. */
        static IsStereoCameras(): boolean;
        /** Are local multi player view services available. */
        static IsMultiPlayerView(): boolean;
        /** Get the current local multi player count */
        static GetMultiPlayerCount(): number;
        /** Activates current local multi player cameras. */
        static ActivateMultiPlayerCameras(scene: BABYLON.Scene): boolean;
        /** Disposes current local multiplayer cameras */
        static DisposeMultiPlayerCameras(): void;
        /** Sets the multi player camera view layout */
        static SetMultiPlayerViewLayout(scene: BABYLON.Scene, totalNumPlayers: number): boolean;
    }
    /*********************************************/
    /** Camera Editor Properties Support Classes */
    /*********************************************/
    interface IEditorArcRtotate {
        alpha: number;
        beta: number;
        radius: number;
        target: BABYLON.IUnityVector3;
    }
    interface IEditorPostProcessing {
        usePostProcessing: boolean;
        highDynamicRange: boolean;
        screenAntiAliasing: PROJECT.IEditorAntiAliasing;
        focalDepthOfField: PROJECT.IEditorDepthOfField;
        chromaticAberration: PROJECT.IEditorChromaticAberration;
        glowLayerProperties: PROJECT.IEditorGlowLayer;
        grainEffectProperties: PROJECT.IEditorGrainEffect;
        sharpEffectProperties: PROJECT.IEditorSharpenEffect;
        bloomEffectProperties: PROJECT.IEditorBloomProcessing;
        imageProcessingConfig: PROJECT.IEditorImageProcessing;
    }
    interface IEditorAntiAliasing {
        fullScreenEnabled: boolean;
        multiAntiAliasing: number;
        screenAntiAliasing: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorDepthOfField {
        depthOfField: boolean;
        blurLevel: number;
        focalStop: number;
        focalLength: number;
        focusDistance: number;
        maxLensSize: number;
    }
    interface IEditorChromaticAberration {
        aberrationEnabled: boolean;
        aberrationAmount: number;
        adaptScaleViewport: boolean;
        alphaMode: number;
        alwaysForcePOT: boolean;
        pixelPerfectMode: boolean;
        fullscreenViewport: boolean;
    }
    interface IEditorGlowLayer {
        glowEnabled: boolean;
        glowIntensity: number;
        blurKernelSize: number;
    }
    interface IEditorGrainEffect {
        grainEnabled: boolean;
        grainAnimated: boolean;
        grainIntensity: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorSharpenEffect {
        sharpenEnabled: boolean;
        sharpEdgeAmount: number;
        sharpColorAmount: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorBloomProcessing {
        bloomEnabled: boolean;
        bloomKernel: number;
        bloomScale: number;
        bloomWeight: number;
        bloomThreshold: number;
    }
    interface IEditorColorCurves {
        curvesEnabled: boolean;
        globalDen: number;
        globalExp: number;
        globalHue: number;
        globalSat: number;
        highlightsDen: number;
        highlightsExp: number;
        highlightsHue: number;
        highlightsSat: number;
        midtonesDen: number;
        midtonesExp: number;
        midtonesHue: number;
        midtonesSat: number;
        shadowsDen: number;
        shadowsExp: number;
        shadowsHue: number;
        shadowsSat: number;
    }
    interface IEditorImageProcessing {
        imageProcessing: boolean;
        imageContrast: number;
        imageExposure: number;
        useColorGrading: boolean;
        setGradingTexture: any;
        imagingColorCurves: PROJECT.IEditorColorCurves;
    }
}
declare module PROJECT {
    /**
     * Babylon Script Component
     * @class DebugInformation
     */
    class DebugInformation extends BABYLON.ScriptComponent {
        private keys;
        private show;
        private popup;
        private views;
        private xbox;
        private color;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any);
        protected start(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class UniversalPlayerController
    */
    class UniversalPlayerController extends BABYLON.ScriptComponent {
        enableInput: boolean;
        attachCamera: boolean;
        rotateCamera: boolean;
        moveCharacter: boolean;
        toggleView: boolean;
        freeLooking: boolean;
        rootMotion: boolean;
        gravityForce: number;
        slopeForce: number;
        rayLength: number;
        rayOrigin: number;
        maxAngle: number;
        speedFactor: number;
        moveSpeed: number;
        lookSpeed: number;
        jumpSpeed: number;
        jumpDelay: number;
        eyesHeight: number;
        pivotHeight: number;
        topLookLimit: number;
        downLookLimit: number;
        lowTurnSpeed: number;
        highTurnSpeed: number;
        takeoffPower: number;
        stoppingPower: number;
        acceleration: boolean;
        avatarSkinTag: string;
        distanceFactor: number;
        cameraSmoothing: number;
        cameraCollisions: boolean;
        inputMagnitude: number;
        minimumDistance: number;
        buttonJump: number;
        keyboardJump: number;
        buttonCamera: number;
        keyboardCamera: number;
        playerNumber: BABYLON.PlayerNumber;
        boomPosition: BABYLON.Vector3;
        movementVelocity: BABYLON.Vector3;
        getPlayerInputX(): number;
        getPlayerInputZ(): number;
        getPlayerMouseX(): number;
        getPlayerMouseY(): number;
        getPlayerJumping(): boolean;
        getPlayerGrounded(): boolean;
        getGroundedMesh(): BABYLON.AbstractMesh;
        getGroundedPoint(): BABYLON.Vector3;
        getGroundedAngle(): number;
        getGroundedNormal(): BABYLON.Vector3;
        getCameraBoomNode(): BABYLON.TransformNode;
        getCameraTransform(): BABYLON.TransformNode;
        getAnimationState(): BABYLON.AnimationState;
        getCharacterController(): BABYLON.CharacterController;
        private abstractMesh;
        private cameraDistance;
        private forwardCamera;
        private dollyDirection;
        private rotationEulers;
        private cameraPivotOffset;
        private cameraForwardVector;
        private cameraRightVector;
        private desiredForwardVector;
        private desiredRightVector;
        private scaledCamDirection;
        private scaledMaxDirection;
        private parentNodePosition;
        private maximumCameraPos;
        private raycastShape;
        private raycastGroup;
        private raycastMask;
        private avatarSkins;
        private cameraNode;
        private cameraPivot;
        private navigationAgent;
        private characterController;
        private isCharacterNavigating;
        private isCharacterGrounded;
        private isCharacterJumpFrame;
        private isCharacterJumpState;
        private navigationAngularSpeed;
        private animationControllerTag;
        private animationStateMachine;
        private animationStateParams;
        private showDebugColliders;
        private colliderVisibility;
        private deltaTime;
        private jumpTimer;
        private playerControl;
        private playerInputX;
        private playerInputZ;
        private playerMouseX;
        private playerMouseY;
        private groundedMesh;
        private groundedPoint;
        private groundedAngle;
        private groundedNormal;
        private verticalVelocity;
        private rootmotionSpeed;
        private smoothDeltaTime;
        private animationState;
        private inputMovementVector;
        private playerLookRotation;
        private playerRotationVector;
        private playerMovementVelocity;
        private playerRotationQuaternion;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
        /** Register handler that is triggered before the controller has been updated */
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered before the controller movement has been applied */
        onBeforeMoveObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** Register handler that is triggered after the controller has been updated */
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        /** TODO */
        setPlayerControl(mode: PROJECT.PlayerInputControl): void;
        /** TODO */
        togglePlayerControl(): void;
        private showAvatarSkins;
        /** TODO */
        attachPlayerCamera(player: BABYLON.PlayerNumber): void;
        private attachAnimationController;
        /** TODO */
        resetPlayerRotation(): void;
        private awakePlayerController;
        private startPlayerController;
        private updatePlayerController;
        private updateCharacterController;
        private updateCheckCollisions;
        private pickingRay;
        private pickingHelper;
        private pickingOrigin;
        private pickingDirection;
        private pickCheckCollisionsRaycast;
        private cameraRay;
        private cameraHelper;
        private cameraForward;
        private cameraDirection;
        private pickCameraCollisionsRaycast;
        private latePlayerController;
        private afterPlayerController;
        private destroyPlayerController;
        private validateAnimationStateParams;
    }
    /**
    * Babylon Interface Definition
    * @interface AnimationStateParams
    */
    interface AnimationStateParams {
        horizontalInput: string;
        verticalInput: string;
        mouseXInput: string;
        mouseYInput: string;
        speedInput: string;
        jumpedInput: string;
        jumpingInput: string;
        groundedInput: string;
    }
    /**
    * Babylon Enum Definition
    * @interface PlayerInputControl
    */
    enum PlayerInputControl {
        FirstPersonStrafing = 0,
        ThirdPersonStrafing = 1,
        ThirdPersonForward = 2
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class FxParticleSystem
    */
    class FxParticleSystem extends BABYLON.ScriptComponent {
        getParticleEmitter(): BABYLON.AbstractMesh;
        getParticleSystem(): BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        protected m_particleEmitter: BABYLON.AbstractMesh;
        protected m_particleSystem: BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class SkyMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class SkyMaterialSystem extends BABYLON.ScriptComponent {
        private skyfog;
        private skysize;
        private probesize;
        private reflections;
        private reflectlevel;
        private skytintcolor;
        getSkyboxMesh(): BABYLON.AbstractMesh;
        getSkyMaterial(): BABYLON.SkyMaterial;
        getReflectionProbe(): BABYLON.ReflectionProbe;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
        protected m_skyboxMesh: BABYLON.Mesh;
        protected m_skyMaterial: BABYLON.SkyMaterial;
        protected m_reflectProbe: BABYLON.ReflectionProbe;
        protected awakeSkyboxMaterial(): void;
        protected destroySkyboxMaterial(): void;
        /** Set Skybox Mesh tint color. (Box Mesh Vertex Colors) */
        setSkyboxTintColor(color: BABYLON.Color3): void;
    }
}
declare module PROJECT {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class WaterMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class WaterMaterialSystem extends BABYLON.ScriptComponent {
        private waterTag;
        private targetSize;
        private renderSize;
        private depthFactor;
        private reflectSkybox;
        private subDivisions;
        private heightOffset;
        private windDirection;
        private windForce;
        private waveSpeed;
        private waveLength;
        private waveHeight;
        private bumpHeight;
        private bumpSuperimpose;
        private bumpAffectsReflection;
        private waterColor;
        private colorBlendFactor;
        private waterColor2;
        private colorBlendFactor2;
        private disableClipPlane;
        private fresnelSeparate;
        getWaterGeometry(): BABYLON.AbstractMesh;
        getWaterMaterial(): BABYLON.WaterMaterial;
        protected m_waterGeometry: BABYLON.AbstractMesh;
        protected m_waterMaterial: BABYLON.WaterMaterial;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SimpleFollowCamera
    */
    class SimpleFollowCamera extends BABYLON.ScriptComponent {
        private smoothFollow;
        private smoothRotate;
        private matchRotation;
        private followTarget;
        private targetPosition;
        private targetRotation;
        protected awake(): void;
        protected start(): void;
        protected late(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SmoothFollowTarget
    */
    class SmoothFollowTarget extends BABYLON.ScriptComponent {
        target: BABYLON.TransformNode;
        targetHeight: number;
        followHeight: number;
        heightDamping: number;
        rotationDamping: number;
        minimumDistance: number;
        maximumDistance: number;
        startBehindTarget: boolean;
        followBehindTarget: boolean;
        private targetPosition;
        private targetAngles;
        private transformAngles;
        private positionBuffer;
        private rotationBuffer;
        private tempRotationBuffer;
        protected awake(): void;
        protected start(): void;
        protected late(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class WaypointTargetManager
    */
    class WaypointTargetManager extends BABYLON.ScriptComponent {
        private _waypointMeshLines;
        private _waypointSplineCurve;
        private _waypointTransformNodes;
        private _waypointSplinePositions;
        private _waypointSphereMaterial;
        resolution: number;
        closedLoop: boolean;
        drawLines: boolean;
        drawPoints: boolean;
        drawTraces: boolean;
        pointSize: number;
        lineHeight: number;
        lineColor: BABYLON.Color3;
        pointColor: BABYLON.Color3;
        traceColor: BABYLON.Color3;
        getSplineCurve(): BABYLON.Curve3;
        getSplineCurveLength(): number;
        getSplineCurvePositions(): BABYLON.Vector3[];
        getControlPointTransforms(): BABYLON.TransformNode[];
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class TestNavigationAgent
    */
    class TestNavigationAgent extends BABYLON.ScriptComponent {
        protected m_playerAgent: BABYLON.NavigationAgent;
        protected start(): void;
        protected doPointerCancel(): void;
        protected doPointerDown(pointerInfo: BABYLON.PointerInfo): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class TestRootMotion
    */
    class TestRootMotion extends BABYLON.ScriptComponent {
        private motionType;
        private speedFactor;
        private startingOffset;
        private overrideSpeed;
        private overrideRotate;
        private attachToParent;
        updatePosition: boolean;
        updateRotation: boolean;
        private rootMotionAngle;
        private rootMotionSpeed;
        protected m_animator: BABYLON.AnimationState;
        protected m_transform: BABYLON.TransformNode;
        protected m_character: BABYLON.CharacterController;
        protected m_rigidbody: BABYLON.RigidbodyPhysics;
        protected m_velocity: BABYLON.Vector3;
        protected awake(): void;
        protected start(): void;
        private lowestFrameTime;
        private highestFrameTime;
        protected update(): void;
        protected turn(): void;
        protected move(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon metadata parser class (Internal use only)
     * @class PerlinNoiseGenerator - All rights reserved (c) 2020 Mackey Kinard
     */
    class PerlinNoiseGenerator {
        private static gradients;
        private static rand_vect;
        private static dot_prod_grid;
        private static smootherstep;
        private static interp;
        /** Seed perlin noise generator */
        static seed(): void;
        /** Generate perlin noise value from 2D coordinates. (Note: Use normalized input values) */
        static generate(x: number, y: number): number;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class CaptionManager
    */
    class CaptionManager extends BABYLON.ScriptComponent {
        protected awake(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class CaptionSystem
    */
    class CaptionSystem extends BABYLON.ScriptComponent {
        private captionType;
        private displayTimer;
        private domElement;
        private textTracks;
        private userLocale;
        logCaptions: boolean;
        getUserLocale(): string;
        getCaptionType(): number;
        protected m_captionElement: HTMLElement;
        protected m_captionSource: BABYLON.WebVideoPlayer | BABYLON.AudioSource;
        protected m_captionTimer: number;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        /** Register handler that is triggered on vtt caption cue changed */
        onUpdateCaptionObservable: BABYLON.Observable<string>;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any);
        protected awakeCaptionSystem(): void;
        protected startCaptionSystem(): void;
        protected updateCaptionSystem(): void;
        protected destroyCaptionSystem(): void;
        private attachCaptionSystem;
        private postCaptionMessage;
        private formatTextTrackKind;
        static EnableDefaultTextTrack(source: HTMLVideoElement | HTMLAudioElement, enable: boolean): void;
    }
    /**
     * Text Track Interface Data
     */
    interface ICaptionTextTrack {
        trackKind: number;
        trackLabel: string;
        trackAsset: BABYLON.IUnityDefaultAsset;
        trackLanguage: string;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class SceneSoundSystem
    */
    class SceneSoundSystem extends BABYLON.ScriptComponent {
        private static _MUSIC;
        static get MUSIC(): MVRK.SoundManager;
        private static _SFX;
        static get SFX(): MVRK.SoundManager;
        protected start(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class SoundManager
    */
    class SoundManager extends BABYLON.ScriptComponent {
        private isReady;
        private groupName;
        getIsReady(): boolean;
        getGroupName(): string;
        protected m_soundMap: Map<string, BABYLON.AudioSource>;
        protected m_soundList: BABYLON.AudioSource[];
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        /**
         * Play the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        playTrack(name: string, time?: number, offset?: number, length?: number): boolean;
        /**
         * Pause the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        pauseTrack(name: string): boolean;
        /**
         * Pause the sound for all tracks in the group
         * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
         */
        pauseAllTracks(): void;
        /**
         * Stop the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        stopTrack(name: string, time?: number): boolean;
        /**
         * Stop the sound for all tracks in the group
         * @param time (optional) Stop the sound after X seconds. Stop immediately (0) by default.
         */
        stopAllTracks(time?: number): void;
        /**
         * Mute the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        muteTrack(name: string, time?: number): boolean;
        /**
         * Unmute the sound track by name
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        unmuteTrack(name: string, time?: number): boolean;
        /**
         * Mutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        muteAllTracks(time?: number): void;
        /**
         * Unmutes the volume for all sound tracks in the group
         * @param time Define time for gradual change to new volume
         */
        unmuteAllTracks(time?: number): void;
        /**
         * Sets the volume for all sound tracks in the group
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        setGroupVolume(volume: number, time?: number): void;
        /**
         * Get a sound source by name
         */
        getAudioSource(name: string): BABYLON.AudioSource;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class VideoController
    */
    class VideoController extends BABYLON.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class InsideNotification
    */
    class InsideNotification extends BABYLON.ScriptComponent {
        private static CurrentRoom;
        private abstractMesh;
        protected awake(): void;
        protected update(): void;
        private pointIsInside;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class PopupTrigger
    */
    class PopupTrigger extends BABYLON.ScriptComponent {
        triggerType: string;
        triggerParam: string;
        private triggerFocus;
        private abstractMesh;
        /** Register handler that is triggered when the mesh has been picked */
        onPickTriggerObservable: BABYLON.Observable<BABYLON.AbstractMesh>;
        protected awake(): void;
        sendMessage(): void;
        registerNewTrigger(): void;
        private gradualFocus;
        private lerpCameraView;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component State Class
    * @class State
    */
    abstract class State {
        abstract onEnter(): void;
        abstract onExit(): void;
        abstract canChangeState(): boolean;
        abstract onStateChangeFail(): void;
        tick(): void;
    }
    /**
    * Babylon Stateful Script Component
    * @class StatefulScriptComponent
    */
    abstract class StatefulScriptComponent extends BABYLON.ScriptComponent {
        private _currentState;
        /** Gets the current script component state */
        getCurrentState(): MVRK.State;
        /** Sets the new script component state */
        setState(newState: MVRK.State, forced?: boolean): boolean;
        /** Register handler that is triggered when the animation ik setup has been triggered */
        onStateChangeObservable: BABYLON.Observable<State>;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class BillboardMesh
    */
    class BillboardMesh extends BABYLON.ScriptComponent {
        private camera;
        protected awake(): void;
        protected update(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class BlinkManager
    */
    class BlinkManager extends BABYLON.ScriptComponent {
        private enableBlinking;
        private blinkingState;
        private blinkingTimer;
        blinkTimeout: number;
        /** Register handler that is triggered when the blink change has been triggered */
        onBlinkUpdateObservable: BABYLON.Observable<boolean>;
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        enableBlinkMode(blinking: boolean): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class FloatingAnimation
    */
    class FloatingAnimation extends BABYLON.ScriptComponent {
        private floatSpeed;
        private floatDistance;
        private randomOffset;
        private initPosition;
        private floatingVector;
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class RotateTransform
    */
    class RotateTransform extends BABYLON.ScriptComponent {
        private rotateSpeedX;
        private rotateSpeedY;
        private rotateSpeedZ;
        protected awake(): void;
        protected update(): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class RuntimeTexture
    */
    class RuntimeTexture extends BABYLON.ScriptComponent {
        protected m_dynamicTexture: BABYLON.Texture;
        protected m_dynamicMaterial: BABYLON.Material;
        protected awake(): void;
        protected destroy(): void;
        setTextureUrl(url: string, invertY?: boolean, createMipmaps?: boolean): void;
    }
}
declare module MVRK {
    /**
    * Babylon Script Component
    * @class SpriteAnimation
    */
    class SpriteAnimation extends BABYLON.ScriptComponent {
        private gridCols;
        private gridRows;
        private startRow;
        private bottomUp;
        private timeInSeconds;
        private colWidth;
        private rowHeight;
        private animTimer;
        private tileIndex;
        private tileReset;
        private baseTexture;
        protected awake(): void;
        protected start(): void;
        protected reset(): void;
        protected update(): void;
        protected animate(): void;
        protected destroy(): void;
    }
}
declare module MVRK {
    /**
     * Babylon scene loader helper class
     * @class SceneLoader
     */
    class SceneLoader {
        static TeleFade: {
            Speed: number;
            Timeout: number;
            Multiplier: number;
            Limit: number;
            SceneFile: any;
        };
        static SwitchScene(sceneFile: string): void;
        static FadeToBlack(blanket: HTMLDivElement, speed: number): void;
        static FadeToScene(blanket: HTMLDivElement, speed: number): void;
        static LoadSceneComplete(): void;
    }
}
declare module MVRK {
    /**
     * Babylon system utilities helper class
     * @class System
     */
    class System {
        static GetUserInfo(): MVRK.IUserInfo;
        static GetGameLobbyInfo(): MVRK.IGameLobby;
    }
    /**
     * User Info Interface
     */
    interface IUserInfo {
        firstName: string;
        lastName: string;
        locale: string;
        email: string;
    }
    interface IGameLobby {
        id: string;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class AnchorInSpot
    */
    class AnchorInSpot extends BABYLON.ScriptComponent {
        protected update(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class AnimatorManager
    */
    class Animator {
        name: string;
        animator: BABYLON.AnimationState;
        constructor(name: string, animator: BABYLON.AnimationState);
    }
    class AnimatorManager extends BABYLON.ScriptComponent {
        animators: PROJECT.Animator[];
        draggables: BABYLON.TransformNode[];
        private static _instance;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any);
        static get Instance(): AnimatorManager;
        protected awake(): void;
        GetAnimator(name: string): PROJECT.Animator;
        BindEndAnimationMessages(animators: PROJECT.Animator[]): void;
        ResetDraggables(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class LimitedDrag
    */
    class LimitedDrag extends BABYLON.ScriptComponent {
        private drag;
        leftBound: number;
        rightBound: number;
        canDrag: boolean;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class Pickable
    */
    class Pickable extends BABYLON.ScriptComponent {
        private abstractMesh;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any);
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class Rotator
    */
    class Rotator extends BABYLON.ScriptComponent {
        private inertiaFactor;
        private speed;
        private drag;
        private max;
        private min;
        private lastSafePoint;
        private _mouseObs;
        private _abm;
        private _animatior;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        private _addMouseObs;
        private _removeMouseObs;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SessionDetail
    */
    class SessionDetail extends BABYLON.ScriptComponent {
        private sessionTexture;
        getSessionTexture(): BABYLON.IUnityTexture;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SessionManager
    */
    class SessionManager extends BABYLON.ScriptComponent {
        private runtimeTexture;
        protected awake(): void;
        protected destroy(): void;
        protected handleTriggerPick(mesh: BABYLON.AbstractMesh): void;
    }
}
