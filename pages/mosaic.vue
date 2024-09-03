<template>
    <div class="webGL_glsi_box" ref="container">
        <img src="/images/thumb/2.png" ref="thumb">
    </div>  
  </template>
  
  <style scoped>
  .webGL_glsi_box{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    pointer-events: none;
  }
  .webGL_glsi_box img{
    width: 400px;
  }
  canvas{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }
  </style>
    <script setup lang="ts">
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
    
    const useSphere = (container: Ref<HTMLElement>, clientWidth: number, clientHeight: number) => {
      const init = () => {
        // レンダラー作成
        const renderer = new WebGLRenderer({
          alpha: true,
          antialias: true
        })
        var thumbData = thumb.value.getBoundingClientRect();

        var w = thumbData.width;
        var h = thumbData.height;
        var as = w / h;
        console.log("as", as);

        // renderer.setClearColor(0xffffff,1);
        renderer.setSize(w, h);
        renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        
        container.value.appendChild(renderer.domElement)

        // 視野角をラジアンに変換
        const fov    = 60;
        const fovRad = (fov / 2) * (Math.PI / 180);

        // 途中式
        // Math.tan(fovRad)        = (height / 2) / dist;
        // Math.tan(fovRad) * dist = (height / 2);
        const dist = (h / 2) / Math.tan(fovRad);

        // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
        var camera = new PerspectiveCamera(fov, w / h, 1, dist * 2);
        camera.position.z = dist;// カメラを遠ざける
  
        const scene = new Scene();
        const loader = new TextureLoader();
        var light = new AmbientLight(0xffffff);
        scene.add(light);
        const texture = loader.load('/nuxt3/images/thumb/2_2.png');

        const geo = new PlaneGeometry(w,h,1);
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
  
  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
// varying vec2      vTexCoord;

// const float tFrag = 1.0 / 400.0;
// const float nFrag = 1.0 / 200.0;

// void main(void){
//     vec4  destColor = vec4(0.0);
//     vec2  fc = vec2(gl_FragCoord.s, 400.0 - gl_FragCoord.t);
//     float offsetX = mod(fc.s, 8.0);
//     float offsetY = mod(fc.t, 8.0);
    
//     for(float x = 0.0; x <= 7.0; x += 1.0){
//         for(float y = 0.0; y <= 7.0; y += 1.0){
//             destColor += texture2D(uTexture, (fc + vec2(x - offsetX, y - offsetY)) * tFrag);
//         }
//     }
//     gl_FragColor = destColor * nFrag;
// }
        `;
        const mat = new ShaderMaterial({
          uniforms: {
            uTexture: { value: texture }
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        });
  
        const mesh = new Mesh(geo, mat);      
        scene.add(mesh);
        renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
    
          const vertexShaderSource = gl.getShaderSource( vertexShader );
          const fragmentShaderSource = gl.getShaderSource( fragmentShader );
          
          console.groupCollapsed( "vertexShader" )
          console.groupEnd()
          
          console.groupCollapsed( "fragmentShader" )
          console.groupEnd()
  
        }
        function render() {
            requestAnimationFrame(render);
            // uniforms.uTime.value++;
            renderer.render(scene, camera);
        }
        render();
  
        renderer.render(scene, camera);
        
      }
      return { init }
    }
    onMounted(() => {
      const { init } = useSphere(container, 500, 500);
      init()
    })
    </script>