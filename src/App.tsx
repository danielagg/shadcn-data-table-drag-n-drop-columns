import { DataTable } from "./DataTable";

export const App = () => {
  return (
    <main className="min-h-screen flex flex-col py-12 bg-gray-900 text-gray-200">
      <section className="container">
        <h1 className="text-3xl font-bold">
          shadcn/ui DataTable w/ drag-n-drop columns
        </h1>
        <p className="text-gray-500 text-sm pt-2">
          This is an example where shadcn/ui's DataTable (built on top of the
          Tanstack Table) is customized to have drag-n-drop functionality for
          its columns.
        </p>
        <p className="text-gray-500 text-sm pt-1">
          Click{" "}
          <a
            href="https://github.com/danielagg/shadcn-data-table-drag-n-drop-columns"
            target="_blank"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            here
          </a>
          , to view the source on GitHub.
        </p>
      </section>
      <section className="pt-16 container">
        <DataTable />
      </section>
    </main>
  );
};
