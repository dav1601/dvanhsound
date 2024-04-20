<!DOCTYPE html>
<html lang="en">

<head>
    <title>Courageous Hearts</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="icon" type="image/x-icon"
        href="https://res.cloudinary.com/vanh-tech/image/upload/v1713317355/favicon_ga91jc.ico">
    {{--  --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&family=Great+Vibes&display=swap"
        rel="stylesheet">
    {{--  --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js"
        integrity="sha512-u3fPA7V8qQmhBPNT5quvaXVa1mnnLSXUep5PS1qo5NRzHwG19aHmNJnj1Q8hpA/nBWZtZD4r4AX6YOt5ynLN2g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        var soureAudio =
            "https://res.cloudinary.com/vanh-tech/video/upload/v1713567895/soundlove/dungngdungtime/dungngdungtime_w9sz9n.mp3";
        var soureLyric =
            "https://res.cloudinary.com/vanh-tech/raw/upload/v1713568567/soundlove/dungngdungtime/lyric_grhahp.lrc";
        var from_name = {{ Js::from($from) }};
        var to_name = {{ Js::from($to) }};
        var message = {{ Js::from($message) }};
        var app_url = {{ Js::from(env('APP_URL')) }};
    </script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: content-box;

        }

        html,
        body {
            font-family: "Cormorant Garamond", serif;
            overflow: hidden;
            background: #16000a;
            font-weight: 900;
        }

        body {
            -webkit-font-smoothing: antialiased;
            color: #ffdada;
        }

        .webgl {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            outline: none;
        }

        body::before {
            content: '';
            position: absolute;
            border: 8px solid;
            inset: 1rem;
            z-index: 100;
            pointer-events: none;
        }

        h1 {
            position: absolute;
            top: 10vh;
            left: 2.5rem;
            right: 1rem;
            text-align: center;
            font-size: max(1rem, 3vh);
            /* font-size: 4rem; */
            font-weight: 900;
            line-height: 1.5;
            text-transform: uppercase;
        }

        #play-music {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            height: 12vh;
            width: 12vh;
            transform: translateY(2vh);
            right: 0;
            margin: auto;
            -webkit-appearance: none;
            background: transparent;
            color: inherit;
            border: none;
            cursor: pointer;
        }

        svg {
            width: 3.5vh;
        }
    </style>
    <style>
        * {
            box-sizing: border-box;
        }

        html {

            font-size: 16px;
            color: hsl(200, 20%, 25%);
        }

        body {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .lyric {
            font-size: 4rem;
            font-weight: bolder;
            line-height: 1.5;
            text-align: center;
            text-transform: uppercase;
            max-width: 300px;
            margin-top: 40px;
            color: black;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2000000000000000;
        }

        .player {
            width: 100%;
            max-width: 300px;
        }

        .anim-typewriter {
            animation: typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 500ms steps(44) infinite normal;
        }

        @keyframes typewriter {
            from {
                width: 0;
            }

            to {
                width: 24em;
            }
        }

        @keyframes blinkTextCursor {
            from {
                border-right-color: rgba(255, 255, 255, 0.75);
            }

            to {
                border-right-color: transparent;
            }
        }
    </style>
    <style>
        /* Explanation in JS tab */

        /* Cool font from Google Fonts! */
        @import url('https://fonts.googleapis.com/css?family=Raleway:900&display=swap');

        body {
            margin: 0px;
        }

        #container {
            /* Center the text in the viewport. */
            position: absolute;
            margin: auto;
            width: 100vw;
            height: 80pt;
            top: 0;
            bottom: 0;

            /* This filter is a lot of the magic, try commenting it out to see how the morphing works! */
            filter: url(#threshold) blur(0.6px);
        }

        /* Your average text styling */
        #text1,
        #text2 {
            position: absolute;
            width: 100%;
            display: inline-block;


            font-size: 80pt;

            text-align: center;

            user-select: none;
        }

        .player {
            display: none;
        }

        #setting {
            position: fixed;
            top: 40px;
            right: 50px;
            z-index: 20000;
            width: 40px;
            cursor: pointer;

        }

        #setting:hover img {
            width: 100%;
            height: auto;
            transform: scale(1.1);
            /* Phóng to ảnh khi hover vào */

        }

        #setting:hover img {
            transform: scale(1.2);
        }
    </style>
</head>

<body>
    <div id="setting">
        <img width="100%" src="https://res.cloudinary.com/vanh-tech/image/upload/v1713479455/favourite_nyvcfb.png"
            alt="">
    </div>
    <audio muted class="player">

    </audio>

    <!-- <div class="lyric anim-typewriter"></div> -->
    <canvas class="webgl"></canvas>
    <h1 id="outputLyrics" class="animate__animated">Hí {{ $to }} , nhấn trái tim kia đi {{ $from }} có
        một điều muốn
        nói với {{ $to }} 😊
    </h1>
    <button id="play-music" type="button" aria-label="Play music">
        <svg fill="currentColor" viewBox="0 0 512 512" width="100" title="music">
            <path
                d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z" />
        </svg>
    </button>
    <script
			type="x-shader/x-vertex"
			id="vertexShader"
		>
			  #define M_PI 3.1415926535897932384626433832795
			uniform float uTime;
			uniform float uSize;
			attribute float aScale;
			attribute vec3 aColor;
			attribute float random;
			attribute float random1;
			attribute float aSpeed;
			varying vec3 vColor;
			varying vec2 vUv;

			void main() {
			  float sign = 2.0* (step(random, 0.5) -.5);
			  float t = sign*mod(-uTime *  aSpeed* 0.005  + 10.0*aSpeed*aSpeed, M_PI);
			  float a = pow(t, 2.0) * pow((t - sign * M_PI), 2.0);
			  float radius = 0.14;
			  vec3 myOffset =
			      vec3(t,  1.0, 0.0);
			  myOffset = vec3(radius *16.0 * pow(sin(t), 2.0) * sin(t), radius * (13.0 * cos(t) - 5.0 * cos(2.0 * t) - 2.0 * cos(3.0 * t) - cos(4.0 * t)), .15*(a*(random1 - .5))*sin(abs(10.0*(sin(.2*uTime + .2*random)))*t));
			  vec3 displacedPosition = myOffset;
			  vec4 modelPosition = modelMatrix * vec4(displacedPosition.xyz, 1.0);

			  vec4 viewPosition = viewMatrix * modelPosition;
			  viewPosition.xyz += position * aScale * uSize * pow(a, .5) * .5;
			  gl_Position = projectionMatrix * viewPosition;

			  vColor = aColor;
			  vUv = uv;
			}
		</script>

    <script
			type="x-shader/x-fragment"
			id="fragmentShader"
		>
			  varying vec3 vColor;
			varying vec2 vUv;

			void main() {
			  vec2 uv = vUv;
			  vec3 color = vColor;
			  float strength = distance(uv, vec2(0.5));
			  strength *= 2.0;
			  strength = 1.0 - strength;
			  gl_FragColor = vec4(strength * color, 1.0);
			}
		</script>
    <script
			type="x-shader/x-vertex"
			id="vertexShader1"
		>
			  #define M_PI 3.1415926535897932384626433832795


			uniform float uTime;
			uniform float uSize;
			attribute float aScale;
			attribute vec3 aColor;
			attribute float phi;
			attribute float random;
			attribute float random1;
			varying vec3 vColor;
			varying vec2 vUv;

			void main() {
			  float t = 0.01 * uTime + 12.0;
			  float angle = phi;

			  t = mod((-uTime + 100.0) * 0.06* random1 + random *2.0 * M_PI , 2.0 * M_PI);
			  vec3 myOffset = vec3(5.85*cos(angle * (t )), 2.0*(t - M_PI), 3.0*sin(angle * (t )/t));
			vec4 modelPosition = modelMatrix * vec4(myOffset, 1.0);
			  vec4 viewPosition = viewMatrix * modelPosition;
			  viewPosition.xyz += position * aScale * uSize;
			  gl_Position = projectionMatrix * viewPosition;

			  vColor = aColor;
			  vUv = uv;
			}
		</script>

    <script
			type="x-shader/x-fragment"
			id="fragmentShader1"
		>
			  uniform sampler2D uTex;
			varying vec3 vColor;
			varying vec2 vUv;

			void main() {
			  vec2 uv = vUv;
			  vec3 color = vColor;
			  float strength = distance(uv, vec2(0.5, .65));
			  strength *= 2.0;
			  strength = 1.0 - strength;
			  vec3 texture = texture2D(uTex, uv).rgb;
			  gl_FragColor = vec4(texture * color * (strength + .3), 1.);
			}
		</script>
</body>
<style>
    .modal-content {
        background: #cf91b5;
        color: black;
    }

    .modal-title {
        color: black;
    }
</style>
<div class="modal fade" id="formLove" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="formLoveLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formLoveLabel">Tạo 1 lời muốn nói với crush thôi nào</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="from_name" class="form-label">Tên bạn</label>
                            <input type="email" class="form-control" id="from_name" aria-describedby="emailHelp">

                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="to_name" class="form-label">Tên Crush</label>
                            <input type="email" class="form-control" id="to_name" aria-describedby="emailHelp">

                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="message" class="form-label">Nhắn gửi lời yêu thương cho người ta đi</label>
                            <textarea class="form-control" id="message" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button type="button" class="btn btn-primary" id="btnCreate">Tạo thư</button>
                        <button class="btn btn-primary d-none" id="btnLoading" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                    <div class="col-12 d-none mt-3" id="rs">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control disabled" disabled readonly
                                placeholder="Đường dẫn để gửi cho crush" aria-label="Đường dẫn để gửi cho crush"
                                aria-describedby="rs_copy" id="rs_input">
                            <button class="btn btn-primary" type="button" id="rs_copy">COPY</button>
                        </div>
                        <div id="emailHelp" class="form-text">Sao chép đường dẫn và gửi cho crush thôi</div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
{{-- end modal --}}
<script type="module">
    !(async function main() {
        'use strict'
        const BASE_URL = 'https://raw.githubusercontent.com/mcanam/assets/main/liricle-demo/'

        const dom = {
            lyric: document.querySelector('#outputLyrics'),
            player: document.querySelector('.player'),
        }

        // load lrc file
        const res = await fetch(soureLyric)
        const lrc = await res.text()

        const lyrics = parseLyric(lrc)

        dom.player.src = soureAudio
        var flag = []
        dom.player.ontimeupdate = () => {
            dom.lyric.classList.remove("animate__zoomIn");
            const time = dom.player.currentTime
            const index = syncLyric(lyrics, time)
            if (index == null) {
                flag = [];
                return
            }
            let newlyric = lyrics[index].text
            dom.lyric.innerHTML = newlyric
            if (typeof flag[index] === "undefined") {
                dom.lyric.classList.remove("animate__lightSpeedInLeft");
                void dom.lyric.offsetWidth;
                dom.lyric.classList.add("animate__lightSpeedInLeft");

                flag[index] = true;
            }

        }
        dom.player.onended = () => {
            dom.lyric.classList.remove("animate__lightSpeedInLeft");
            void dom.lyric.offsetWidth;
            dom.lyric.innerHTML = message
            dom.lyric.classList.add("animate__zoomIn");
            flag = [];
        }

    })()

    // lrc (String) - lrc file text
    function parseLyric(lrc) {
        // will match "[00:00.00] ooooh yeah!"
        // note: i use named capturing group
        const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/

        // split lrc string to individual lines
        const lines = lrc.split('\n')

        const output = []

        lines.forEach((line) => {
            const matches = line.match(regex)

            // if doesn't match, return.
            if (matches == null) return

            const {
                time,
                text
            } = matches.groups

            output.push({
                time: parseTime(time),
                text: text.trim(),
            })
        })

        // parse formated time
        // "03:24.73" => 204.73 (total time in seconds)
        function parseTime(time) {
            const minsec = time.split(':')

            const min = parseInt(minsec[0]) * 60
            const sec = parseFloat(minsec[1])

            return min + sec
        }

        return output
    }

    // lyrics (Array) - output from parseLyric function
    // time (Number) - current time from audio player
    function syncLyric(lyrics, time) {
        const scores = []

        lyrics.forEach((lyric) => {
            // get the gap or distance or we call it score
            const score = time - lyric.time

            // we don't want a negative score
            if (score >= 0) scores.push(score)
        })

        if (scores.length == 0) return null

        // get the smallest value from scores
        const closest = Math.min(...scores)

        // return the index of closest lyric
        return scores.indexOf(closest)
    }
    /* Poly Heart model by Quaternius [CC0] (https://creativecommons.org/publicdomain/zero/1.0/) via Poly Pizza (https://poly.pizza/m/1yCRUwFnwX)
     */

    import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
    import {
        gsap
    } from 'https://cdn.skypack.dev/gsap@3.8.0'
    import {
        GLTFLoader
    } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader'
    class World {
        constructor({
            canvas,
            width,
            height,
            cameraPosition,
            fieldOfView = 75,
            nearPlane = 0.1,
            farPlane = 100

        }) {

            this.parameters = {
                count: 1500,
                max: 12.5 * Math.PI,
                a: 2,
                c: 4.5,
            }
            this.textureLoader = new THREE.TextureLoader()
            this.scene = new THREE.Scene()
            this.scene.background = new THREE.Color(0x16000a)
            this.clock = new THREE.Clock()
            this.data = 0
            this.time = {
                current: 0,
                t0: 0,
                t1: 0,
                t: 0,
                frequency: 0.0005
            }
            this.angle = {
                x: 0,
                z: 0
            }
            this.width = width || window.innerWidth
            this.height = height || window.innerHeight
            this.aspectRatio = this.width / this.height
            this.fieldOfView = fieldOfView
            this.camera = new THREE.PerspectiveCamera(fieldOfView, this.aspectRatio, nearPlane, farPlane)
            this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
            this.scene.add(this.camera)
            this.renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
            })
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.renderer.setPixelRatio(this.pixelRatio)
            this.renderer.setSize(this.width, this.height)
            this.timer = 0
            this.addToScene()
            this.addButton()
            this.render()
            this.listenToResize()
            this.listenToMouseMove()

        }
        start() {}
        render() {
            this.renderer.render(this.scene, this.camera)
            this.composer && this.composer.render()
        }
        loop() {
            this.time.elapsed = this.clock.getElapsedTime()
            this.time.delta = Math.min(60, (this.time.current - this.time.elapsed) * 1000)
            if (this.analyser && this.isRunning) {
                this.time.t = this.time.elapsed - this.time.t0 + this.time.t1
                this.data = this.analyser.getAverageFrequency()
                this.data *= this.data / 2000
                this.angle.x += this.time.delta * 0.001 * 0.63
                this.angle.z += this.time.delta * 0.001 * 0.39
                const justFinished = this.isRunning && !this.sound.isPlaying
                if (justFinished) {
                    this.time.t1 = this.time.t
                    this.audioBtn.disabled = false
                    this.isRunning = false
                    const tl = gsap.timeline()
                    this.angle.x = 0
                    this.angle.z = 0
                    tl.to(this.camera.position, {
                        x: 0,
                        z: 4.5,
                        duration: 4,
                        ease: 'expo.in',
                    })
                    tl.to(this.audioBtn, {
                        opacity: () => 1,
                        duration: 1,
                        ease: 'power1.out',
                    })
                } else {
                    this.camera.position.x = Math.sin(this.angle.x) * this.parameters.a
                    this.camera.position.z = Math.min(Math.max(Math.cos(this.angle.z) * this.parameters.c, 1.75),
                        6.5)
                }
            }
            this.camera.lookAt(this.scene.position)
            if (this.heartMaterial) {
                this.heartMaterial.uniforms.uTime.value += this.time.delta * this.time.frequency * (1 + this.data *
                    0.2)
            }
            if (this.model) {
                this.model.rotation.y -= 0.0005 * this.time.delta * (1 + this.data)
            }
            if (this.snowMaterial) {
                this.snowMaterial.uniforms.uTime.value += this.time.delta * 0.0004 * (1 + this.data)
            }
            this.render()

            this.time.current = this.time.elapsed
            requestAnimationFrame(this.loop.bind(this))
        }
        listenToResize() {
            window.addEventListener('resize', () => {
                // Update sizes
                this.width = window.innerWidth
                this.height = window.innerHeight

                // Update camera
                this.camera.aspect = this.width / this.height
                this.camera.updateProjectionMatrix()
                this.renderer.setSize(this.width, this.height)
            })
        }
        listenToMouseMove() {
            window.addEventListener('mousemove', (e) => {
                const x = e.clientX
                const y = e.clientY
                gsap.to(this.camera.position, {
                    x: gsap.utils.mapRange(0, window.innerWidth, 0.2, -0.2, x),
                    y: gsap.utils.mapRange(0, window.innerHeight, 0.2, -0.2, -y),
                })
            })
        }
        addHeart() {
            this.heartMaterial = new THREE.ShaderMaterial({
                fragmentShader: document.getElementById('fragmentShader').textContent,
                vertexShader: document.getElementById('vertexShader').textContent,
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uSize: {
                        value: 0.2
                    },

                    uTex: {
                        value: new THREE.TextureLoader().load('https://assets.codepen.io/74321/heart.png'),
                    },
                },
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                transparent: true,
            })
            const count = this.parameters.count //2000
            const scales = new Float32Array(count * 1)
            const colors = new Float32Array(count * 3)
            const speeds = new Float32Array(count)
            const randoms = new Float32Array(count)
            const randoms1 = new Float32Array(count)
            const colorChoices = ['white', 'red', 'pink', 'crimson', 'hotpink', 'green']

            const squareGeometry = new THREE.PlaneGeometry(1, 1)
            this.instancedGeometry = new THREE.InstancedBufferGeometry()
            Object.keys(squareGeometry.attributes).forEach((attr) => {
                this.instancedGeometry.attributes[attr] = squareGeometry.attributes[attr]
            })
            this.instancedGeometry.index = squareGeometry.index
            this.instancedGeometry.maxInstancedCount = count

            for (let i = 0; i < count; i++) {
                const phi = Math.random() * Math.PI * 2
                const i3 = 3 * i
                randoms[i] = Math.random()
                randoms1[i] = Math.random()
                scales[i] = Math.random() * 0.35
                const colorIndex = Math.floor(Math.random() * colorChoices.length)
                const color = new THREE.Color(colorChoices[colorIndex])
                colors[i3 + 0] = color.r
                colors[i3 + 1] = color.g
                colors[i3 + 2] = color.b
                speeds[i] = Math.random() * this.parameters.max
            }
            this.instancedGeometry.setAttribute('random', new THREE.InstancedBufferAttribute(randoms, 1, false))
            this.instancedGeometry.setAttribute('random1', new THREE.InstancedBufferAttribute(randoms1, 1, false))
            this.instancedGeometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1, false))
            this.instancedGeometry.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speeds, 1, false))
            this.instancedGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3, false))
            this.heart = new THREE.Mesh(this.instancedGeometry, this.heartMaterial)
            this.scene.add(this.heart)
        }
        addToScene() {
            this.addModel()
            this.addHeart()
            this.addSnow()
        }
        async addModel() {
            this.model = await this.loadObj('https://assets.codepen.io/74321/heart.glb')
            this.model.scale.set(0.01, 0.01, 0.01)
            this.model.material = new THREE.MeshMatcapMaterial({
                matcap: this.textureLoader.load(
                    'https://assets.codepen.io/74321/3.png',
                    () => {
                        gsap.to(this.model.scale, {
                            x: 0.35,
                            y: 0.35,
                            z: 0.35,
                            duration: 1.5,
                            ease: 'Elastic.easeOut',
                        })
                    }),
                color: '#ff89aC',
            })


            this.scene.add(this.model)
        }
        addButton() {
            this.audioBtn = document.querySelector('button')
            this.audioBtn.addEventListener('click', () => {
                this.audioBtn.disabled = true
                if (this.analyser) {
                    this.sound.play()
                    document.querySelector('.player').play()
                    this.time.t0 = this.time.elapsed
                    this.data = 0
                    this.isRunning = true
                    gsap.to(this.audioBtn, {
                        opacity: 0,
                        duration: 1,
                        ease: 'power1.out',
                    })
                } else {
                    this.loadMusic().then(() => {

                    })
                }
            })
        }
        loadObj(path) {
            const loader = new GLTFLoader()
            return new Promise((resolve) => {
                loader.load(
                    path,
                    (response) => {
                        resolve(response.scene.children[0])
                    },
                    (xhr) => {},
                    (err) => {

                    },
                )
            })
        }
        // ANCHOR load music //////////////////////////////////////////////////////
        loadMusic() {
            return new Promise((resolve) => {
                const listener = new THREE.AudioListener()
                this.camera.add(listener)
                // create a global audio source
                this.sound = new THREE.Audio(listener)
                const audioLoader = new THREE.AudioLoader()
                audioLoader.load(
                    soureAudio,
                    (buffer) => {
                        this.sound.setBuffer(buffer)
                        this.sound.setLoop(false)
                        this.sound.setVolume(0.5)
                        document.querySelector('.player').play()
                        this.sound.play()
                        this.analyser = new THREE.AudioAnalyser(this.sound, 32)
                        // get the average frequency of the sound
                        const data = this.analyser.getAverageFrequency()
                        this.isRunning = true
                        this.t0 = this.time.elapsed
                        resolve(data)
                    },
                    (progress) => {
                        gsap.to(this.audioBtn, {
                            opacity: () => 1 - progress.loaded / progress.total,
                            duration: 1,
                            ease: 'power1.out',
                        })
                    },

                    (error) => {

                    },
                )


            })
        }
        addSnow() {
            this.snowMaterial = new THREE.ShaderMaterial({
                fragmentShader: document.getElementById('fragmentShader1').textContent,
                vertexShader: document.getElementById('vertexShader1').textContent,
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uSize: {
                        value: 0.3
                    },
                    uTex: {
                        value: new THREE.TextureLoader().load('https://assets.codepen.io/74321/heart.png'),
                    },
                },
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                transparent: true,
            })
            const count = 550
            const scales = new Float32Array(count * 1)
            const colors = new Float32Array(count * 3)
            const phis = new Float32Array(count)
            const randoms = new Float32Array(count)
            const randoms1 = new Float32Array(count)
            const colorChoices = ['red', 'pink', 'hotpink', 'green']

            const squareGeometry = new THREE.PlaneGeometry(1, 1)
            this.instancedGeometry = new THREE.InstancedBufferGeometry()
            Object.keys(squareGeometry.attributes).forEach((attr) => {
                this.instancedGeometry.attributes[attr] = squareGeometry.attributes[attr]
            })
            this.instancedGeometry.index = squareGeometry.index
            this.instancedGeometry.maxInstancedCount = count

            for (let i = 0; i < count; i++) {
                const phi = (Math.random() - 0.5) * 10
                const i3 = 3 * i
                phis[i] = phi
                randoms[i] = Math.random()
                randoms1[i] = Math.random()
                scales[i] = Math.random() * 0.35
                const colorIndex = Math.floor(Math.random() * colorChoices.length)
                const color = new THREE.Color(colorChoices[colorIndex])
                colors[i3 + 0] = color.r
                colors[i3 + 1] = color.g
                colors[i3 + 2] = color.b
            }
            this.instancedGeometry.setAttribute('phi', new THREE.InstancedBufferAttribute(phis, 1, false))
            this.instancedGeometry.setAttribute('random', new THREE.InstancedBufferAttribute(randoms, 1, false))
            this.instancedGeometry.setAttribute('random1', new THREE.InstancedBufferAttribute(randoms1, 1, false))
            this.instancedGeometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1, false))
            this.instancedGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3, false))
            this.snow = new THREE.Mesh(this.instancedGeometry, this.snowMaterial)
            this.scene.add(this.snow)
        }
    }

    const world = new World({
        canvas: document.querySelector('canvas.webgl'),
        cameraPosition: {
            x: 0,
            y: 0,
            z: 4.5
        },
    })

    world.loop()
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js"></script>
{{-- ANCHOR  --}}
<script>
    $(function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var from_name_el = $("#from_name");
        var to_name_el = $("#to_name");
        var message_el = $("#message");

        function reset() {
            from_name_el.val("");
            to_name_el.val("");
            message_el.val("");

        }

        function copyToClipboardFallback() {
            var copyText = document.getElementById("rs_input");

            // Select the text field
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);

            // Alert the copied text
            alert("Copied the url");
        }

        $(document).on('click', "#setting", function() {
            $("#formLove").modal("show");
        });
        $(document).on('click', "#rs_copy", function() {
            copyToClipboardFallback();
        });
        var myModalEl = document.getElementById('formLove')
        myModalEl.addEventListener('hidden.bs.modal', function(event) {
            reset();
            $("#rs").addClass("d-none");

        })
        $(document).on('click', "#btnCreate", function() {
            const from = from_name_el.val();
            const to = to_name_el.val();
            const message = message_el.val();
            if (!from) return alert("Không ghi tên chắc crush biết ai gửi he thần giao cách cảm he");
            if (!to) return alert("Không ghi tên crush chắc gửi cho nhiều em lắm he");
            if (!message) return alert("Tới lời nhắn còn quên ghi tỏ tình crush sao đồng ý ?");
            $.ajax({
                type: "post",
                url: app_url + "/trending/create",
                data: {
                    from: from,
                    to: to,
                    message: message
                },
                beforeSend: function() {
                    $("#rs").addClass("d-none");
                    $("#btnCreate").addClass("d-none");
                    $("#btnLoading").removeClass("d-none");
                },
                success: function(res) {
                    const data = res.data;
                    $("#btnLoading").addClass("d-none");
                    $("#btnCreate").removeClass("d-none");
                    $("#rs input").val(data.public_url);
                    $("#rs").removeClass("d-none")
                    reset();

                }
            });
        });







        // END READYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
    });
</script>


</html>
