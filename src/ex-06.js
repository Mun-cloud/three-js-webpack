import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color(0x004fff)

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    // scene의 background를 없애면 배경 없이 실행 여부를 정할 수 있음
    alpha: true,
    // 부드럽게 표현
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //   빛
  const pointLight = new THREE.PointLight(0xffffff, 1) // (색상, 세기)
  // .set(x, y, z) : x, y, z를 한번에 설정할 수 있음
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 텍스쳐 추가
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/Stylized_Fur_001_basecolor.jpg'
  )
  const textureNormalMap = textureLoader.load(
    '../static/img/Stylized_Fur_001_normal.jpg'
  )
  const textureHeightMap = textureLoader.load(
    '../static/img/Stylized_Fur_001_height.png'
  )
  const textureRoughnessMap = textureLoader.load(
    '../static/img/Stylized_Fur_001_roughness.jpg'
  )

  // 매쉬
  const COLOR = 0xeeeeee
  const geometry = new THREE.SphereGeometry(0.4, 30, 40)
  //   const geometry = new THREE.PlaneGeometry(1, 1)

  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -1.5
  scene.add(obj01)

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  })
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -0.5
  scene.add(obj02)

  // MeshDepthMaterial : 깊이감을 표현하는 재질 (확인용으로 씀)
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.02,
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  obj03.position.x = 0.5
  scene.add(obj03)

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.02,
    roughnessMap: textureRoughnessMap,
    roughness: 0.8,
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 1.5
  scene.add(obj04)

  function render(time) {
    time *= 0.0005

    renderer.render(scene, camera)

    // obj01.rotation.y = time
    // obj02.rotation.y = time
    // obj03.rotation.y = time
    // obj04.rotation.y = time
    // obj05.rotation.y = time

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형 처리
  function onWindowResize() {
    // 화면 사이즈 가변화
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
