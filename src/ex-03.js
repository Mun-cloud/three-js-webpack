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

  // 캔버스
  // const canvas = document.querySelector('#ex-03')

  // 렌더러
  // const renderer = new THREE.WebGLRenderer({ canvas })
  const renderer = new THREE.WebGLRenderer({
    // scene의 background를 없애면 배경 없이 실행 여부를 정할 수 있음
    alpha: true,
    // 부드럽게 표현
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 매쉬
  // 어떤 Geometry를 사용하냐에 따라 도형의 모양이 바뀜
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj01 = new THREE.Mesh(geometry01, material01)
  obj01.position.x = -2
  scene.add(obj01)

  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj02 = new THREE.Mesh(geometry02, material02)
  scene.add(obj02)

  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({ color: 0x999999 })
  const obj03 = new THREE.Mesh(geometry03, material03)
  obj03.position.x = 2
  scene.add(obj03)

  function render(time) {
    time *= 0.0005

    obj01.rotation.y = time
    obj02.rotation.y = time
    obj03.rotation.y = time

    renderer.render(scene, camera)

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
