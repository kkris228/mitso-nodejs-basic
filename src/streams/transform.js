import { Transform, pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

class MyTransform extends Transform {
    constructor(opr) {
        super(opr);
    }

    _transform(chunk, _, done) {
        const transformChunk = chunk
        .toString("utf-8")
        .trim()
        .split("")
        .reverse()
        .join("");

        this.push(transformChunk + "\n");
        done();
    }
}

const transform = async () => {
    const transformStream = new MyTransform();
    const readableStream = process.stdin;
    const writableStream = process.stdout;

    try {
        await pipelineAsync(readableStream, transformStream, writableStream);
    } catch (err) {
        process.stderr.wrire(e.message);
        process.exit(1);
    }
};

await transform();