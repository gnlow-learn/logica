import p from "npm:pyodide@0.28.2/pyodide.js"

const pyodide = await p.loadPyodide()

await pyodide.loadPackage("micropip")

await pyodide.runPythonAsync(`
    import micropip
    await micropip.install("logica")

    from logica.parser_py import parse
    from logica.compiler import universe

    def compile(program, predicate):
        return universe.LogicaProgram(
            parse.ParseFile(program)["rule"]
        ).FormattedPredicateSql(predicate)
`)

const compile: (program: string, predicate: string) => string =
    pyodide.globals.get("compile")

console.log(
    compile(`
        @Engine("sqlite");

        Hello("World");
    `, "Hello")
)
