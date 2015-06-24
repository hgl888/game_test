/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5DeviceContext
     * @classdesc
     * @extends egret.DeviceContext
     * @private
     */
    class HTML5DeviceContext extends DeviceContext {
        frameRate: number;
        private _time;
        private static instance;
        /**
         * @method egret.HTML5DeviceContext#constructor
         */
        constructor(frameRate?: number);
        static requestAnimationFrame: Function;
        static cancelAnimationFrame: Function;
        static _thisObject: any;
        static _callback: Function;
        private _requestAnimationId;
        private enterFrame();
        /**
         * @method egret.HTML5DeviceContext#executeMainLoop
         * @param callback {Function}
         * @param thisObject {any}
         */
        executeMainLoop(callback: Function, thisObject: any): void;
        private reset();
        private _isActivate;
        private registerListener();
    }
}
declare module egret_html5_localStorage {
    function getItem(key: string): string;
    function setItem(key: string, value: string): boolean;
    function removeItem(key: string): void;
    function clear(): void;
    function init(): void;
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5CanvasRenderer
     * @classdesc
     * @extends egret.RendererContext
     * @private
     */
    class HTML5CanvasRenderer extends RendererContext {
        private canvas;
        /**
         * @member egret.HTML5CanvasRenderer#canvasContext
         */
        private canvasContext;
        private _matrixA;
        private _matrixB;
        private _matrixC;
        private _matrixD;
        private _matrixTx;
        private _matrixTy;
        _transformTx: number;
        _transformTy: number;
        private blendValue;
        private _cacheCanvas;
        private _cacheCanvasContext;
        private useCacheCanvas;
        drawCanvasContext: CanvasRenderingContext2D;
        constructor(canvas?: HTMLCanvasElement, useCacheCanvas?: boolean);
        private createCanvas();
        private onResize();
        clearScreen(): void;
        clearRect(x: number, y: number, w: number, h: number): void;
        drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, renderType?: any): void;
        setTransform(matrix: Matrix): void;
        setAlpha(alpha: number, blendMode: string): void;
        private blendModes;
        private initBlendMode();
        setupFont(textField: TextField, style?: ITextStyle): void;
        measureText(text: string): number;
        drawText(textField: TextField, text: string, x: number, y: number, maxWidth: number, style?: ITextStyle): void;
        strokeRect(x: any, y: any, w: any, h: any, color: any): void;
        pushMask(mask: Rectangle): void;
        popMask(): void;
        onRenderStart(): void;
        onRenderFinish(): void;
        drawCursor(x1: number, y1: number, x2: number, y2: number): void;
    }
}
declare module egret_h5_graphics {
    function beginFill(color: number, alpha?: number): void;
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawCircle(x: number, y: number, r: number): void;
    function drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
    function drawEllipse(x: number, y: number, width: number, height: number): void;
    function lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number): void;
    function lineTo(x: number, y: number): void;
    function curveTo(controlX: Number, controlY: Number, anchorX: Number, anchorY: Number): void;
    function moveTo(x: number, y: number): void;
    function clear(): void;
    function createEndFillCommand(): void;
    function endFill(): void;
    function _fill(): void;
    function createEndLineCommand(): void;
    function _pushCommand(cmd: any): void;
    function _draw(renderContext: egret.RendererContext): void;
    function _setStyle(colorStr: string): void;
    function init(): void;
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.WebGLRenderer
     * @classdesc
     * WebGL的渲染类
     * @extends egret.RendererContext
     * @private
     */
    class WebGLRenderer extends RendererContext {
        private static glID;
        private static isInit;
        private canvas;
        private gl;
        private glID;
        private size;
        private vertices;
        private vertSize;
        private indices;
        private projectionX;
        private projectionY;
        private shaderManager;
        constructor(canvas?: HTMLCanvasElement);
        onRenderFinish(): void;
        private initAll();
        private createCanvas();
        private onResize();
        private contextLost;
        private handleContextLost();
        private handleContextRestored();
        private initWebGL();
        private glContextId;
        private vertexBuffer;
        private indexBuffer;
        private setContext(gl);
        private start();
        clearScreen(): void;
        private currentBlendMode;
        private setBlendMode(blendMode);
        private currentBaseTexture;
        private currentBatchSize;
        drawRepeatImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat: any): void;
        drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat?: any): void;
        private _drawWebGL();
        private worldTransform;
        setTransform(matrix: Matrix): void;
        private worldAlpha;
        setAlpha(value: number, blendMode: string): void;
        createWebGLTexture(texture: Texture): void;
        private maskList;
        private maskDataFreeList;
        pushMask(mask: Rectangle): void;
        private getScissorRect(mask);
        popMask(): void;
        private scissor(x, y, w, h);
        private colorTransformMatrix;
        setGlobalColorTransform(colorTransformMatrix: any[]): void;
        setGlobalFilter(filterData: Filter): void;
        private filterType;
        private setFilterProperties(filterData);
        private html5Canvas;
        private canvasContext;
        setupFont(textField: TextField, style?: ITextStyle): void;
        measureText(text: string): number;
        private graphicsPoints;
        private graphicsIndices;
        private graphicsBuffer;
        private graphicsIndexBuffer;
        renderGraphics(graphics: any): void;
        private updateGraphics(graphics);
        private buildRectangle(graphicsData);
        private graphicsStyle;
        setGraphicsStyle(r: number, g: number, b: number, a: number): void;
    }
}
declare module egret_webgl_graphics {
    function beginFill(color: number, alpha?: number): void;
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawCircle(x: number, y: number, r: number): void;
    function drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
    function drawEllipse(x: number, y: number, width: number, height: number): void;
    function lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number): void;
    function lineTo(x: number, y: number): void;
    function curveTo(controlX: Number, controlY: Number, anchorX: Number, anchorY: Number): void;
    function moveTo(x: number, y: number): void;
    function clear(): void;
    function endFill(): void;
    function _pushCommand(cmd: any): void;
    function _draw(renderContext: egret.WebGLRenderer): void;
    function _setStyle(r: number, g: number, b: number, a: number): void;
    function init(): void;
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class WebGLUtils {
        static compileProgram(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string): WebGLProgram;
        static compileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string): WebGLShader;
        static compileVertexShader(gl: WebGLRenderingContext, shaderSrc: string): WebGLShader;
        private static _compileShader(gl, shaderSrc, shaderType);
        private static canUseWebGL;
        static checkCanUseWebGL(): boolean;
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class EgretShader {
        private defaultVertexSrc;
        private gl;
        program: WebGLProgram;
        fragmentSrc: string;
        private uSampler;
        projectionVector: WebGLUniformLocation;
        private offsetVector;
        private dimensions;
        aVertexPosition: number;
        aTextureCoord: number;
        colorAttribute: number;
        attributes: number[];
        uniforms: any;
        constructor(gl: WebGLRenderingContext);
        init(): void;
        initUniforms(): void;
        syncUniforms(): void;
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class ColorTransformShader extends EgretShader {
        fragmentSrc: string;
        uniforms: {
            matrix: {
                type: string;
                value: number[];
            };
            colorAdd: {
                type: string;
                value: {
                    x: number;
                    y: number;
                    z: number;
                    w: number;
                };
            };
        };
        constructor(gl: WebGLRenderingContext);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class BlurShader extends EgretShader {
        fragmentSrc: string;
        uniforms: {
            blur: {
                type: string;
                value: {
                    x: number;
                    y: number;
                };
            };
        };
        constructor(gl: WebGLRenderingContext);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class PrimitiveShader {
        private gl;
        program: WebGLProgram;
        projectionVector: WebGLUniformLocation;
        offsetVector: WebGLUniformLocation;
        tintColor: WebGLUniformLocation;
        aVertexPosition: number;
        colorAttribute: number;
        attributes: number[];
        translationMatrix: WebGLUniformLocation;
        alpha: WebGLUniformLocation;
        fragmentSrc: string;
        vertexSrc: string;
        constructor(gl: WebGLRenderingContext);
        private init();
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     *
     * @private
     */
    class WebGLShaderManager {
        private gl;
        private maxAttibs;
        private attribState;
        private tempAttribState;
        constructor(gl: any);
        currentShader: any;
        defaultShader: EgretShader;
        primitiveShader: PrimitiveShader;
        colorTransformShader: ColorTransformShader;
        blurShader: BlurShader;
        setContext(gl: any): void;
        activateShader(shader: any): void;
        private setAttribs(attribs);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5NetContext
     * @classdesc
     * @extends egret.NetContext
     * @private
     */
    class HTML5NetContext extends NetContext {
        constructor();
        proceed(loader: URLLoader): void;
        private loadSound(loader);
        private getXHR();
        private setResponseType(xhr, responseType);
        private loadTexture(loader);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @private
     */
    class HTML5TouchContext extends TouchContext {
        private _isTouchDown;
        private rootDiv;
        constructor();
        private prevent(event);
        run(): void;
        private addMouseListener();
        private addTouchListener();
        private inOutOfCanvas(event);
        private dispatchLeaveStageEvent();
        private _onTouchBegin(event);
        private _onTouchMove(event);
        private _onTouchEnd(event);
        private getLocation(rootDiv, event);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @classdesc
     * @extends egret.StageText
     * @private
     */
    class HTML5StageText extends StageText {
        constructor();
        private _isNeedShow;
        private inputElement;
        private inputDiv;
        private _gscaleX;
        private _gscaleY;
        _initElement(x: number, y: number, cX: number, cY: number): void;
        _show(multiline: boolean, size: number, width: number, height: number): void;
        private onBlurHandler();
        private executeShow();
        private _isNeesHide;
        _hide(): void;
        private textValue;
        _getText(): string;
        _setText(value: string): void;
        private resetText();
        _onInput(): void;
        _onClickHandler(e: any): void;
        _onDisconnect(): void;
        private _styleInfoes;
        private setElementStyle(style, value);
        _removeInput(): void;
        /**
         * 修改位置
         * @private
         */
        _resetStageText(): void;
    }
    class HTMLInput {
        private _stageText;
        private _simpleElement;
        private _multiElement;
        private _inputElement;
        _inputDIV: any;
        isInputOn(): boolean;
        isCurrentStageText(stageText: any): boolean;
        private initValue(dom);
        _needShow: boolean;
        private initStageDelegateDiv();
        private initInputElement(multiline);
        show(): void;
        disconnectStageText(stageText: any): void;
        clearInputElement(): void;
        getInputElement(stageText: any): any;
        private static _instance;
        static getInstance(): HTMLInput;
    }
}
