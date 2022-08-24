# obj2lowpolyvao

Takes a [Wavefront .obj](https://en.wikipedia.org/wiki/Wavefront_.obj_file) file and creates a "low poly model" with indexing compatible with [WebGLVertexArrayObject](https://developer.mozilla.org/en-US/docs/Web/API/WebGLVertexArrayObject).

## usage

```sh
deno run --allow-read --allow-write src/main.ts --f assets/obj/example.obj --o assets/lowpoly/example.json
```

## lowpoly

"low poly model" in this context means faces do not share vertices. For example a corner of a cube will have 3 vertices (instead of 1), each with their own texture coord and normal for sharp edges.
