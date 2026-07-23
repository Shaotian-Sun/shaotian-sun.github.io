(async () => {
  const root = document.getElementById('flat-geodesic-viewer');
  const runs = window.FLAT_GEODESIC_RUNS;
  const canvases = [...root.querySelectorAll('canvas')];
  const pointText = root.querySelector('.fg-point');
  const form = root.querySelector('.fg-controls');
  const xInput = root.querySelector('#fg-x');
  const yInput = root.querySelector('#fg-y');
  const errorText = root.querySelector('.fg-error');
  let endpoint = [runs[0].size - 1, runs[0].size - 1];
  runs.forEach((run, index) => {
    run.viewDomain = index === 1 ? 5 : run.domain;
  });

  function css(name) {
    const probe = document.createElement('span');
    probe.style.color = `var(${name})`;
    probe.style.display = 'none';
    root.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return resolved;
  }
  function decode(s) {
    const raw = atob(s), bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return bytes;
  }
  pointText.textContent = 'Loading 40 geodesic realizations…';
  await Promise.all(runs.map(async run => {
    if (run.predFiles) {
      run.ensembleBits = await Promise.all(run.predFiles.map(async file => {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return new Uint8Array(await response.arrayBuffer());
      }));
    } else {
      run.ensembleBits = (run.preds || [run.pred]).map(decode);
    }
  }));
  pointText.textContent = 'Endpoint: (10.00, 10.00)';
  function bit(bytes, index) { return (bytes[index >> 3] >> (index & 7)) & 1; }

  function tracePath(run, bits) {
    let i = endpoint[0], j = endpoint[1];
    const path = [];
    while (true) {
      path.push({
        i, j,
        x: (i - run.radius) / run.n,
        y: (j - run.radius) / run.n
      });
      if ((i - run.radius) + (j - run.radius) <= 0) break;
      if (bit(bits, i * run.size + j)) i--; else j--;
    }
    return path.reverse();
  }

  function drawBoundaries(ctx, run, side) {
    const d = run.viewDomain;
    const px = x => (x + d) * side / (2 * d);
    const py = y => side - (y + d) * side / (2 * d);
    function segment(x0, y0, x1, y1, color, width, dash = []) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(px(x0), py(y0));
      ctx.lineTo(px(x1), py(y1));
      ctx.stroke();
    }

    function ellipticBranch(sign, startX) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      let started = false;
      for (let step = 0; step <= 800; step++) {
        const x = startX + (d - startX) * step / 800;
        const y = 1 + (Math.sqrt(x - 1) + sign) ** 2;
        if (y < 1 || y > d) {
          started = false;
          continue;
        }
        if (!started) ctx.moveTo(px(x), py(y));
        else ctx.lineTo(px(x), py(y));
        started = true;
      }
      ctx.stroke();
    }

    const ell = 5;
    const delta = Math.sqrt(ell * ell - 4 * ell);
    const m = (ell - 2 + delta) / (ell - 2 - delta);
    const mFlat = (ell - 2 + delta) / 2;
    const junctionLow = 1 + 1 / ((mFlat - 1) ** 2);
    const junctionHigh = mFlat * junctionLow;
    segment(0, 0, junctionLow, junctionHigh, '#22c55e', 2, [9, 4, 2, 4]);
    segment(0, 0, junctionHigh, junctionLow, '#22c55e', 2, [9, 4, 2, 4]);
    segment(1, 1, junctionLow, junctionHigh, '#f97316', 2, [8, 6]);
    segment(1, 1, junctionHigh, junctionLow, '#f97316', 2, [8, 6]);
    ellipticBranch(1, junctionLow);
    ellipticBranch(-1, junctionHigh);

    segment(-d, d, d, -d, css('--foreground'), 2.4);
    segment(0, 0, 1, 1, css('--viz-series-2'), 3);
    ctx.setLineDash([]);
  }

  function draw(canvas, run) {
    const dpr = window.devicePixelRatio || 1;
    const side = Math.max(280, Math.floor(canvas.getBoundingClientRect().width));
    canvas.width = Math.floor(side * dpr); canvas.height = Math.floor(side * dpr);
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    const n = run.n, count = run.field.length;
    const viewDomain = run.viewDomain;
    const px = x => (x + viewDomain) * side / (2 * viewDomain);
    const py = y => side - (y + viewDomain) * side / (2 * viewDomain);
    const fieldStep = 2 * run.domain / (count - 1);
    const cell = fieldStep * side / (2 * viewDomain);
    const values = run.field.flat().filter(value => value >= 0);
    const lo = Math.min(...values), hi = Math.max(...values);
    const bg = css('--background'), series = css('--viz-series-3');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, side, side);
    for (let x = 0; x < count; x++) for (let y = 0; y < count; y++) {
      if (run.field[x][y] < 0) continue;
      const fieldX = -run.domain + x * fieldStep;
      const fieldY = -run.domain + y * fieldStep;
      if (
        fieldX < -viewDomain - fieldStep || fieldX > viewDomain + fieldStep ||
        fieldY < -viewDomain - fieldStep || fieldY > viewDomain + fieldStep
      ) continue;
      const t = (run.field[x][y] - lo) / Math.max(1e-9, hi - lo);
      ctx.globalAlpha = 0.08 + 0.78 * t; ctx.fillStyle = series;
      ctx.fillRect(px(fieldX) - cell / 2, py(fieldY) - cell / 2, cell + .5, cell + .5);
    }
    ctx.globalAlpha = 1; ctx.strokeStyle = css('--border'); ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px(0), 0); ctx.lineTo(px(0), side);
    ctx.moveTo(0, py(0)); ctx.lineTo(side, py(0));
    ctx.stroke();
    drawBoundaries(ctx, run, side);
    const pathColors = [
      '#e11d48', '#2563eb', '#16a34a', '#d97706', '#9333ea',
      '#0891b2', '#db2777', '#4f46e5', '#65a30d', '#ea580c',
      '#0d9488', '#7c3aed', '#ca8a04', '#0284c7', '#dc2626',
      '#059669', '#c026d3', '#475569', '#84cc16', '#f97316'
    ];
    ctx.globalAlpha = 0.72;
    ctx.lineWidth = run.ensembleBits.length > 1 ? 1.15 : 2.2;
    run.ensembleBits.forEach((bits, index) => {
      const path = tracePath(run, bits);
      ctx.strokeStyle = pathColors[index % pathColors.length];
      ctx.beginPath();
      path.forEach((point, index) => {
        const screenX = px(point.x);
        const screenY = py(point.y);
        if (index === 0) ctx.moveTo(screenX, screenY); else ctx.lineTo(screenX, screenY);
      });
      ctx.stroke();
    });
    const endpointX = (endpoint[0] - run.radius) / run.n;
    const endpointY = (endpoint[1] - run.radius) / run.n;
    ctx.globalAlpha = 1; ctx.fillStyle = css('--viz-series-2');
    ctx.beginPath(); ctx.arc(px(endpointX), py(endpointY), 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = css('--border'); ctx.lineWidth = 1; ctx.strokeRect(.5, .5, side - 1, side - 1);
  }
  function redraw() { canvases.forEach((canvas, i) => draw(canvas, runs[i], i)); }
  function selectCoordinates(x, y) {
    const run = runs[0], d = run.domain;
    if (!Number.isFinite(x) || !Number.isFinite(y) || x < -d || x > d || y < -d || y > d) {
      errorText.textContent = `Enter x and y between −${d} and ${d}.`;
      return false;
    }
    if (x + y < -1e-9) {
      errorText.textContent = 'The endpoint must satisfy x + y ≥ 0.';
      return false;
    }
    const i = Math.round((x + d) * run.n);
    const j = Math.round((y + d) * run.n);
    endpoint = [i, j];
    const latticeX = (i - run.radius) / run.n;
    const latticeY = (j - run.radius) / run.n;
    xInput.value = latticeX.toFixed(2); yInput.value = latticeY.toFixed(2);
    pointText.textContent = `Endpoint: (${latticeX.toFixed(2)}, ${latticeY.toFixed(2)})`;
    errorText.textContent = '';
    redraw();
    return true;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    selectCoordinates(Number(xInput.value), Number(yInput.value));
  });
  canvases.forEach((canvas, canvasIndex) => canvas.addEventListener('pointerdown', event => {
    const box = canvas.getBoundingClientRect();
    const run = runs[canvasIndex], viewRadius = Math.round(run.viewDomain * run.n);
    let i = run.radius + Math.round(
      ((event.clientX - box.left) / box.width * 2 - 1) * viewRadius
    );
    let j = run.radius + Math.round(
      ((box.bottom - event.clientY) / box.height * 2 - 1) * viewRadius
    );
    if (i + j < 2 * run.radius) j = 2 * run.radius - i;
    selectCoordinates((i - run.radius) / run.n, (j - run.radius) / run.n);
  }));
  new ResizeObserver(redraw).observe(root); redraw();
})();
