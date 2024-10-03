<template>
    <div class="webGL_glsi_box" ref="container">
        <img src="/images/thumb/12.jpg" ref="thumb">
    </div>  
  </template>
  
  <style lang="scss">
  .webGL_glsi_box{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    pointer-events: none;
    img,
    canvas{
      width: 1200px;
      height: auto !important;
    }
    img{
      width: 100%;
    }
    canvas{
      top: 0;
      left: 0;
      position: absolute;
    }
  }
  </style>
    <script setup lang="ts">
    import { Value } from 'sass';
import {
      PerspectiveCamera,
      OrthographicCamera,
      Scene,
      WebGLRenderer, AmbientLight, SpotLight, Object3D, type Object3DEventMap,
      TextureLoader,
      PlaneGeometry,
      ShaderMaterial,
      Mesh,
      MeshPhongMaterial,
      MeshBasicMaterial
  } from 'three'
    
    const container: Ref<HTMLElement> = ref(null!);
    const thumb: Ref<HTMLElement> = ref(null!);
    var texture: any;
    var pos: any;
    var isActive = false;
    var mat = new ShaderMaterial();
    var uniforms = {
      uPos: 20.0,
      uTexture: texture
    }

    const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
        `;
        //逆になる？
        const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  uniform float uPos;
// 10色を定義
vec3 palette[54] = vec3[](    
vec3(0.47, 0.47, 0.47),
vec3(0.13, 0.00, 0.69),
vec3(0.16, 0.00, 0.72),
vec3(0.38, 0.06, 0.63),
vec3(0.60, 0.13, 0.47),
vec3(0.69, 0.06, 0.19),
vec3(0.63, 0.19, 0.00),
vec3(0.47, 0.25, 0.00),
vec3(0.28, 0.35, 0.00),
vec3(0.22, 0.41, 0.00),

vec3(0.22, 0.42, 0.00),
vec3(0.19, 0.38, 0.25),
vec3(0.19, 0.31, 0.50),
vec3(0.69, 0.69, 0.69),
vec3(0.25, 0.38, 0.97),
vec3(0.25, 0.25, 1.00),
vec3(0.56, 0.25, 0.94),
vec3(0.85, 0.25, 0.75),
vec3(0.85, 0.25, 0.38),
vec3(0.88, 0.31, 0.00),

vec3(0.75, 0.44, 0.00),
vec3(0.53, 0.53, 0.00),
vec3(0.31, 0.63, 0.00),
vec3(0.28, 0.66, 0.06),
vec3(0.28, 0.63, 0.41),
vec3(0.25, 0.56, 0.75),
vec3(0.38, 0.63, 1.00),
vec3(0.31, 0.50, 1.00),
vec3(0.63, 0.44, 1.00),
vec3(0.94, 0.38, 1.00),

vec3(1.00, 0.38, 0.69),
vec3(1.00, 0.47, 0.19),
vec3(1.00, 0.63, 0.00),
vec3(0.91, 0.82, 0.13),
vec3(0.60, 0.91, 0.00),
vec3(0.44, 0.94, 0.25),
vec3(0.44, 0.88, 0.56),
vec3(0.38, 0.82, 0.88),
vec3(0.56, 0.82, 1.00),
vec3(0.63, 0.72, 1.00),

vec3(0.75, 0.69, 1.00),
vec3(0.88, 0.69, 1.00),
vec3(1.00, 0.72, 0.91),
vec3(1.00, 0.78, 0.72),
vec3(1.00, 0.85, 0.63),
vec3(1.00, 0.94, 0.56),
vec3(0.78, 0.94, 0.50),
vec3(0.63, 0.94, 0.63),
vec3(0.63, 1.00, 0.78),
vec3(0.63, 1.00, 0.94),

vec3(0.00, 0.00, 0.00),
vec3(0.47, 0.47, 0.47),
vec3(0.63, 0.63, 0.63),
vec3(1.00, 1.00, 1.00)
    
);
  
void main(void){
    // テクスチャから色を取得
    //一度モザイク処理する
    float set_uPos_x = uPos * 3.0;
    float set_uPos_y = uPos * 2.0;
    vec2 mUv = vec2( floor(vUv.x * set_uPos_x) / set_uPos_x, floor(vUv.y * set_uPos_y) / set_uPos_y );
    vec4 texColor = texture(uTexture, mUv);
    
    // 最小距離と最も近い色を保持する変数
    float minDist = 1000.0;
    vec3 closestColor = palette[0];
    
    // 各色との距離を計算
    for (int i = 0; i < 54; i++) {
        float dist = distance(texColor.rgb, palette[i]);
        if (dist < minDist) {
            minDist = dist;
            closestColor = palette[i];
        }
    }

    // vec2 uv = vec2( floor(vUv.x * 40.0) / 40.0, floor(vUv.y * 17.0) / 17.0 );

    // テクスチャから色を取り出してピクセルの色とします
    // gl_FragColor = texture(uTexture, mUv);
    gl_FragColor = vec4(closestColor, texColor.a);

}
        `;    
    const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
      const init = () => {
        // レンダラー作成
        const renderer = new WebGLRenderer({
          alpha: true,
          antialias: true
        })
        var thumbData = thumb.value.getBoundingClientRect();

        var w = 0;
        var h = 0;
        var camera = new PerspectiveCamera(45, window.innerWidth / window.outerWidth, 1, 2000);
  
        const scene = new Scene();
        const loader = new TextureLoader();
        var light = new AmbientLight(0xffffff);
        scene.add(light);
        texture = loader.load('/nuxt3/images/thumb/12.jpg',
          function(texture) { // テクスチャがロードされた後に呼び出されるコールバック
            // テクスチャの画像データから幅と高さを取得
            w = texture.image.naturalWidth;
            h = texture.image.naturalHeight;

            renderer.setSize(w, h);
            renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
            

            // 視野角をラジアンに変換
            const fov    = 60;
            const fovRad = (fov / 2) * (Math.PI / 180);
            const dist = (h / 2) / Math.tan(fovRad);
            camera = new PerspectiveCamera(fov, w / h, 1, dist * 2);

            camera.position.z = dist;// カメラを遠ざける

            container.value.appendChild(renderer.domElement);

            renderer.domElement.style.width = "100%";


            SetPlaneGeometry();

          },
        );        

        renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
    
          const vertexShaderSource = gl.getShaderSource( vertexShader );
          const fragmentShaderSource = gl.getShaderSource( fragmentShader );
          
          console.groupCollapsed( "vertexShader" )
          console.groupEnd()
          
          console.groupCollapsed( "fragmentShader" )
          console.groupEnd()
  
        }
        function SetPlaneGeometry(){
          const geo = new PlaneGeometry(w, h, 1);

          uniforms.uTexture = texture;

          // console.log("uniforms.uTexture", uniforms.uTexture);

          mat = new ShaderMaterial({
            // uniforms: {
            //   uTexture:{value:texture}
            // },
            uniforms: {
              uPos:{value: uniforms.uPos},
              uTexture:{value:texture}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
          });
    
          const mesh = new Mesh(geo, mat);      
          scene.add(mesh);
          isActive = true;
          console.log("isActive", isActive);
        }

        function render(time: number) {
          requestAnimationFrame(render);
          if (isActive) {
            console.log("uniforms.uPos", uniforms.uPos);
            mat.uniforms.uPos.value = time * 0.01;
          }
          renderer.render(scene, camera);
        }
        console.log(isActive);
        render(0);
        renderer.render(scene, camera);
       
      }
      return { init }
    }
    onMounted(() => {
      const { init } = useSphere(container, 500, 500);
      init()
    })
    </script>