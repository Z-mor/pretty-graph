export const arrowVertexShader: string = `
  precision mediump float;

  attribute vec3 translation; // x y translation offsets for an instance

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const vertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float scale;
  uniform float nodeScalingFactor;
  uniform vec2 spriteDim;
  uniform vec2 textureDim;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 color;       // only used for raycasting
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float size;
  attribute float image;

  varying vec3 vColor;
  varying float vScale;
  varying float vNodeScaleFactor;
  varying float vSize;
  varying highp vec4 v_sprite;

  void main() {
    vColor = color;
    vScale = scale;
    vSize = size;
    vNodeScaleFactor = nodeScalingFactor;

    highp vec2 sp = vec2(mod((image * spriteDim.x), textureDim.x), floor((image * spriteDim.x) / textureDim.y) * spriteDim.y);
    v_sprite = vec4(sp.x / textureDim.x, sp.y / textureDim.y, spriteDim.x / textureDim.x, spriteDim.y / textureDim.y);

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    if (size * scale * nodeScalingFactor > 12.0) {
      gl_PointSize = size * scale * nodeScalingFactor;
    } else {
      gl_PointSize = 12.0;
    }
  }
`;

export const labelsVertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec2 spriteDim;
  uniform vec2 textureDim;
  uniform float scale;
  uniform float nodeScalingFactor;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float image;
  attribute float size;
  attribute vec2 uv;

  varying highp vec4 v_sprite;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    highp vec2 sp = vec2(mod((image * spriteDim.x), textureDim.x), floor((image * spriteDim.x) / textureDim.y) * spriteDim.y);
    v_sprite = vec4(sp.x / textureDim.x, sp.y / textureDim.y, spriteDim.x / textureDim.x, spriteDim.y / textureDim.y);

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x + nodeScalingFactor * (size / 2.0), pos.y, pos.z, 1.0);
  }
`;

export const arrowFragmentShader: string = `
  precision highp float;

  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export const fragmentShader: string = `
  precision highp float;

  uniform sampler2D textureMap;

  varying float vScale;
  varying float vNodeScaleFactor;
  varying float vSize;
  varying vec3 vColor;
  varying highp vec4 v_sprite;

  void main() {
    vec2 uv = vec2( gl_PointCoord.x, gl_PointCoord.y );
    float radius = 0.5;
    float border = 0.0;
    float distance = 0.0;

    vec2 m = uv - vec2(0.5, 0.5);
    float dist = radius - sqrt(dot(m, m));

    if (vSize * vNodeScaleFactor * vScale > 40.0) {
      distance = 0.025;
      if (0.08 - vSize * (vScale / 1000.0) > 0.04) {
        border = 0.08 - vSize * (vScale / 1000.0) / 2.0;
      } else {
        border = 0.06;
      }

      float sm = smoothstep(0.0, distance, dist);
      float sm2 = smoothstep(border, border - distance, dist);
      float alpha = sm*sm2;

      float tm = smoothstep(border, border + distance, dist);

      if (dist > border)
        gl_FragColor = vec4(texture2D(textureMap, vec2((v_sprite.s + v_sprite.p * uv.x), (v_sprite.t + v_sprite.q * uv.y))).rgb, tm);
      else if (dist > 0.0)
        gl_FragColor = vec4(vColor, alpha);
      else discard;
    } else {
      distance = 0.1;
      border = 0.15;
      float l = vColor.r * 0.3 + vColor.g * 0.59 + vColor.b * 0.11;
      if (l > 0.5) {
        // gray
        if (vScale < 0.5) {
          distance = 0.1;
          border = 0.25;
        } else if (vScale > 10.0) {
          border = 0.05;
          distance = 0.016;
        } else {
          border = 0.3 - vScale / 50.0;
          distance = border / 2.5;
        }
      }

      float sm = smoothstep(0.0, distance, dist);
      float sm2 = smoothstep(border, border - distance, dist);
      float alpha = sm*sm2;

      if (dist > border || dist > 0.0)
        gl_FragColor = vec4(vColor, alpha);
      else discard;
    }
  }
`;

export const labelsFragmentShader: string = `
  precision highp float;

  uniform sampler2D textureMap;

  varying highp vec4 v_sprite;
  varying vec2 vUv;

  void main() {
    vec2 uv = vec2( vUv.x, 1.0 - vUv.y );
    gl_FragColor = texture2D(textureMap, vec2((v_sprite.s + v_sprite.p * uv.x), (v_sprite.t + v_sprite.q * uv.y)));
  }
`;

export const pickingVertexShader: string = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float nodeScalingFactor;
  uniform float scale;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 color;       // only used for raycasting
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float size;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = size * scale * nodeScalingFactor;
  }
`;

export const pickingFragmentShader: string = `
  #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
  #endif

  precision highp float;

  varying vec3 vColor;

  void main() {
    float r = 0.0, delta = 0.0, alpha = 1.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    if (r > 1.0) {
      discard;
    }

    gl_FragColor = vec4(vColor, 1.0) * alpha;
  }
`;
