type Vec3 = [number, number, number];
type Vec2 = [number, number];

export function parseobj(objstring: string, flip_uv_vertical = true) {
  const v: Vec3[] = [];
  const vt: Vec2[] = [];

  const lines = objstring.split("\n");
  const arraylines = lines.map((line) => line.split(" "));

  // read vertices and texturecoords
  for (const line of arraylines) {
    if (line[0] === "v") {
      const x = Number(line[1]);
      const y = Number(line[2]);
      const z = Number(line[3]);
      v.push([x, y, z]);
    } else if (line[0] === "vt") {
      const u = Number(line[1]);
      const v = Number(line[2]);
      vt.push([u, v]);
    }
  }

  const index: Vec3[] = [];
  const position: Vec3[] = [];
  const uv: Vec2[] = [];
  const normal: Vec3[] = [];
  for (const line of arraylines) {
    if (!(line[0] === "f")) continue;

    index.push([position.length, position.length + 1, position.length + 2]);

    const [v_ind1, vt_ind1] = line[1].split("/").map(Number);
    const p1 = v[v_ind1 - 1];
    const uv1 = vt[vt_ind1 - 1];

    const [v_ind2, vt_ind2] = line[2].split("/").map(Number);
    const p2 = v[v_ind2 - 1];
    const uv2 = vt[vt_ind2 - 1];

    const [v_ind3, vt_ind3] = line[3].split("/").map(Number);
    const p3 = v[v_ind3 - 1];
    const uv3 = vt[vt_ind3 - 1];

    position.push(p1);
    position.push(p2);
    position.push(p3);

    uv.push(flip_uv_vertical ? flipy(uv1) : uv1);
    uv.push(flip_uv_vertical ? flipy(uv2) : uv2);
    uv.push(flip_uv_vertical ? flipy(uv3) : uv3);

    const n = surfaceNormal([p1, p2, p3]);
    normal.push(n);
    normal.push(n);
    normal.push(n);
  }

  //return { index, position, normal, uv };
  return {
    index: index.flat(),
    position: position.flat(),
    normal: normal.flat(),
    uv: uv.flat(),
  };
}

function vec(from: Vec3, to: Vec3): Vec3 {
  return [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function len(v: Vec3) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function div(v: Vec3, k: number): Vec3 {
  return [v[0] / k, v[1] / k, v[2] / k];
}

function flipy(uv: Vec2): Vec2 {
  return [uv[0], 1 - uv[1]];
}

function surfaceNormal(ps: [Vec3, Vec3, Vec3]): Vec3 {
  const a = vec(ps[0], ps[1]);
  const b = vec(ps[0], ps[2]);
  const v = cross(a, b);
  return div(v, len(v));
}
