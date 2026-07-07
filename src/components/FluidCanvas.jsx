import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uBloom;
uniform vec2  uMouse;
uniform float uDensity;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}

float fbm(vec2 p){
  float v=0.,a=0.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=0.5;}
  return v;
}

vec3 pal(float t){
  vec3 c1=vec3(1.000,0.302,0.427);
  vec3 c2=vec3(1.000,0.722,0.188);
  vec3 c3=vec3(0.659,1.000,0.243);
  vec3 c4=vec3(0.114,0.620,0.459);
  vec3 c5=vec3(0.102,0.435,1.000);
  float s=fract(t)*5.0;
  vec3 col=mix(c1,c2,clamp(s,0.,1.));
  col=mix(col,c3,clamp(s-1.,0.,1.));
  col=mix(col,c4,clamp(s-2.,0.,1.));
  col=mix(col,c5,clamp(s-3.,0.,1.));
  col=mix(col,c1,clamp(s-4.,0.,1.));
  return col;
}

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;
  float r=length(uv);
  float t=uTime;

  vec2 m=vec2(abs(uv.x),abs(uv.y));
  float ra=0.35*sin(t*0.698);
  mat2 R=mat2(cos(ra),-sin(ra),sin(ra),cos(ra));
  vec2 p=R*m*(2.2*uDensity);
  p+=uMouse*0.30;

  vec2 q=vec2(fbm(p+vec2(0.,t*0.10)),fbm(p+vec2(5.2,1.3)-t*0.08));
  float f=fbm(p+2.6*q);

  float front=mix(1.05,-0.15,uBloom);
  float mask=smoothstep(front,front+0.45,r)*smoothstep(0.,0.12,uBloom);

  float ang=atan(m.y,m.x);
  vec3 col=vec3(0.);
  for(int i=0;i<3;i++){
    float fi=float(i);
    float turn=0.5*sin(t*0.698+fi*2.09);
    float band=sin((f*(3.+fi*1.4)+ang*1.5+q.x*4.+fi*2.1-r*2.5+turn+t*0.28)*3.14159);
    float d=abs(band);
    float sel=smoothstep(0.50,0.70,fbm(p*0.6+vec2(fi*3.7,7.1)+q*0.8));
    float line=exp(-d*d*(110.-fi*25.))*sel;
    float glow=exp(-d*d*20.)*0.22*sel;
    float hue=f*1.4+q.y*0.8+fi*0.33+ang*0.12+t*0.02;
    col+=(line*1.5+glow)*pal(hue);
  }
  col*=mask;

  float pk=pow(uBloom,4.);
  col+=vec3(1.)*exp(-r*r*420.)*pk*0.60;
  col+=vec3(1.)*exp(-r*r*90.)*pk*0.14;

  float sy=gl_FragCoord.y/uRes.y;
  float sx=abs(gl_FragCoord.x/uRes.x-0.5);
  col*=1.-0.72*smoothstep(0.30,0.06,sy)*smoothstep(0.44,0.26,sx);

  col=1.-exp(-col*1.15);
  gl_FragColor=vec4(col,1.);
}
`

export default function FluidCanvas({
  ambient = true,
  holdSeconds = 1.4,
  tendrilDensity = 1,
  wordmarkRef,
  hintRef,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(sh))
      return sh
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res:     gl.getUniformLocation(prog, 'uRes'),
      time:    gl.getUniformLocation(prog, 'uTime'),
      bloom:   gl.getUniformLocation(prog, 'uBloom'),
      mouse:   gl.getUniformLocation(prog, 'uMouse'),
      density: gl.getUniformLocation(prog, 'uDensity'),
    }

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.floor(canvas.clientWidth  * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    onResize()
    window.addEventListener('resize', onResize)

    let bloom = 0
    let lastActive = -1e9
    let awakened = false
    const mouse   = { x: 0, y: 0 }
    const mouseSm = { x: 0, y: 0 }

    const onPointer = (e) => {
      lastActive = performance.now()
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
      if (!awakened) {
        awakened = true
        if (hintRef?.current) {
          hintRef.current.style.opacity = '0'
        }
      }
    }
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('pointerdown', onPointer)

    const start = performance.now()
    let last = start
    let raf

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const idleMs = holdSeconds * 1000
      let target = (now - lastActive) < idleMs ? 1 : 0
      if (ambient) target = Math.max(target, 0.35 + 0.15 * Math.sin(now * 0.0004))

      const k = 1 - Math.exp(-dt * 1.8)
      bloom      += (target    - bloom)      * k
      mouseSm.x  += (mouse.x   - mouseSm.x) * k
      mouseSm.y  += (mouse.y   - mouseSm.y) * k

      gl.uniform2f(u.res,     canvas.width, canvas.height)
      gl.uniform1f(u.time,    (now - start) / 1000)
      gl.uniform1f(u.bloom,   bloom)
      gl.uniform2f(u.mouse,   mouseSm.x, mouseSm.y)
      gl.uniform1f(u.density, tendrilDensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (wordmarkRef?.current) {
        wordmarkRef.current.style.opacity = Math.pow(bloom, 3).toFixed(4)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [ambient, holdSeconds, tendrilDensity, wordmarkRef, hintRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  )
}
