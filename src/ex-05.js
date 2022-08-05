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

  // 매쉬
  const COLOR = 0xff7f00
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  // MeshBasicMaterial : 빛에 영향을 받지 않는 재질
  const material01 = new THREE.MeshBasicMaterial({ color: COLOR })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -2
  scene.add(obj01)

  const material02 = new THREE.MeshStandardMaterial({
    color: COLOR,
    // 재질 설정
    metalness: 0.5,
    // 거칠기
    roughness: 0.5,
    // 투명도 설정
    transparent: true,
    opacity: 0.7,
  })
  // 속성을 따로 선언할수도 있음
  // wireframe : 선으로 표현
  material02.wireframe = true
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -1
  scene.add(obj02)

  // MeshDepthMaterial : 깊이감을 표현하는 재질 (확인용으로 씀)
  const material03 = new THREE.MeshDepthMaterial({ color: COLOR })
  const obj03 = new THREE.Mesh(geometry, material03)
  scene.add(obj03)

  const material04 = new THREE.MeshPhysicalMaterial({ color: COLOR })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 1
  scene.add(obj04)

  const material05 = new THREE.MeshPhongMaterial({
    color: COLOR,
    shininess: 60,
  })
  const obj05 = new THREE.Mesh(geometry, material05)
  obj05.position.x = 2
  scene.add(obj05)

  function render(time) {
    time *= 0.0005

    renderer.render(scene, camera)

    obj01.rotation.y = time
    obj02.rotation.y = time
    obj03.rotation.y = time
    obj04.rotation.y = time
    obj05.rotation.y = time

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
