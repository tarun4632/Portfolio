import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Vertex shader source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fsSource = `
      precision highp float;

      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Hexagonal grid helper functions
      vec4 hexCoords(vec2 uv) {
          vec2 r = vec2(1.0, 1.73205);
          vec2 h = r * 0.5;
          
          vec2 a = mod(uv, r) - h;
          vec2 b = mod(uv - h, r) - h;
          
          vec2 gv = length(a) < length(b) ? a : b;
          vec2 id = uv - gv;
          
          // Compute distance to edge for hex outline
          float x = abs(gv.x);
          float y = abs(gv.y);
          float d = max(x, x * 0.5 + y * 0.866025);
          
          return vec4(gv.x, gv.y, id.x, id.y);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 aspect_uv = uv;
          aspect_uv.x *= u_resolution.x / u_resolution.y;
          
          // Background color (Soft Carbon / Slate Grey)
          vec3 bg_color = vec3(0.016, 0.020, 0.028);
          
          // Moving ambient gradient wash (brighter silver/grey space dust effect)
          vec2 glow_pos = vec2(0.5 + 0.3 * sin(u_time * 0.15), 0.5 + 0.3 * cos(u_time * 0.1));
          float dist_to_glow = distance(uv, glow_pos);
          vec3 glow_wash = vec3(0.025, 0.025, 0.032) * smoothstep(1.3, 0.0, dist_to_glow);
          bg_color += glow_wash;
          
          // Scale for high-density hexagons
          float scale = 24.0;
          vec4 hc = hexCoords(aspect_uv * scale);
          
          // Pseudo-random resource tile color assignment (quantized to prevent floating-point precision stripes)
          vec2 cell_id = floor(hc.zw * 100.0 + 0.5);
          float r_val = fract(sin(dot(cell_id, vec2(12.9898, 78.233))) * 43758.5453);
          vec3 cell_color = vec3(0.2, 0.2, 0.2); // fallback
          
          if (r_val < 0.25) {
              cell_color = vec3(0.78, 0.70, 0.48); // Matte Yellow
          } else if (r_val < 0.50) {
              cell_color = vec3(0.40, 0.52, 0.42); // Matte Green
          } else if (r_val < 0.75) {
              cell_color = vec3(0.68, 0.46, 0.40); // Matte Brick Red
          } else {
              cell_color = vec3(0.54, 0.66, 0.52); // Matte Light Green
          }
          
          // Hex outlines
          float edge_dist = max(abs(hc.x), abs(hc.x) * 0.5 + abs(hc.y) * 0.866025);
          float line = smoothstep(0.46, 0.48, edge_dist);
          
          // Mouse interaction
          vec2 mouse_uv = u_mouse / u_resolution;
          vec2 aspect_mouse = mouse_uv;
          aspect_mouse.x *= u_resolution.x / u_resolution.y;
          
          // Distance from hex center to mouse
          vec2 hex_center = hc.zw / scale;
          float d = distance(aspect_mouse, hex_center);
          
          // GLOW RADIUS: Concentrated mouse glow
          float glow_radius = 0.18; 
          float glow = pow(smoothstep(glow_radius, 0.0, d), 1.5);
          
          // Glow color is a brightened version of the matte tile color, mixed with white to lighten/soften it
          vec3 glow_color = mix(cell_color * 1.6, vec3(0.95, 0.95, 0.98), 0.35);
          
          // Slow ambient wave pulse on the grid lines (keeps background textured and visible)
          float wave = sin(aspect_uv.y * 1.5 - u_time * 0.3) * cos(aspect_uv.x * 1.5 + u_time * 0.25) * 0.5 + 0.5;
          float current_grid_alpha = mix(0.24, 0.38, wave);
          
          vec3 final_color = bg_color;
          
          // The grid lines with active ambient pulse
          float grid = line * current_grid_alpha;
          
          // Ambient grid uses the respective Catan tile's color
          vec3 active_grid_color = mix(cell_color * 0.75, glow_color, glow);
          
          // Add grid color
          final_color += grid * active_grid_color;
          
          // Interaction: Light up nearby hexagons (uses matching resource glow color)
          float cell_bright = glow * 0.5;
          final_color += glow_color * cell_bright;
          
          // TIGHTER BLOOM (matching resource color)
          float bloom = smoothstep(glow_radius * 1.2, 0.0, d) * 0.08;
          final_color += glow_color * bloom;
          
          // Final hex outline glow reinforcement
          final_color += glow_color * line * glow * 0.8;

          gl_FragColor = vec4(final_color, 1.0);
      }
    `;

    // Compile shader helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create a square buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // Global mouse state relative to canvas coordinates
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouseX = nx * canvas.width;
        mouseY = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Sync drawing buffer size with actual display size
    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    // Use ResizeObserver for responsive resizing
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        syncSize();
      });
      resizeObserver.observe(document.body);
    }
    syncSize();

    let animationFrameId: number;

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      id="shader-canvas-ANIMATION_23"
    />
  );
}
