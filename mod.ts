import p from "npm:pyodide@0.28.2/pyodide.js"

const pyodide = await p.loadPyodide()

await pyodide.loadPackage("micropip")
const micropip = await pyodide.pyimport("micropip")

await micropip.install(["logica"])

await pyodide.runPythonAsync(`
    from logica.parser_py import parse
    from logica.compiler import universe

    print(
        universe.LogicaProgram(
            parse.ParseFile("""
                @Engine("sqlite");

                Hello("World");
            """)["rule"]
        ).FormattedPredicateSql("Hello")
    )
`)
