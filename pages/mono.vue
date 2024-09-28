<template>
    <div class="webGL_glsi_box" ref="container">
        <img src="/images/thumb/3.jpg" ref="thumb">
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
// 外部ファイルからシェーダーをインポート
import vertexShader from '~/assets/shaders/default_vs.glsl?raw';
import fragmentShader from '~/assets/shaders/mono_fs.glsl?raw';    

    const container: Ref<HTMLElement> = ref(null!);
    const thumb: Ref<HTMLElement> = ref(null!);
    var texture: any;
    var pos: any;
    var isActive = false;
    var mat = new ShaderMaterial();
    var uniforms = {
      uPos: 20.0,
      uTime: 0.0,
      uTexture: texture
    } 
    let _u_progress = 0;

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
        texture = loader.load('/nuxt3/images/thumb/3.jpg',
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

          mat = new ShaderMaterial({
            uniforms: {
              uTime: {value: 0.0},
              uPos:{value: uniforms.uPos},
              uTexture:{value:texture}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
          });
    
          const mesh = new Mesh(geo, mat);      
          scene.add(mesh);
          isActive = true;
        }

        function render(time: number) {
          requestAnimationFrame(render);
          if (isActive) {
            mat.uniforms.uPos.value = 20.0;
            _u_progress = time * 0.0001;
            if (_u_progress > 1.0) {
              _u_progress = 1.0;
            }
            mat.uniforms.uTime.value = _u_progress;
          }
          renderer.render(scene, camera);
        }
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