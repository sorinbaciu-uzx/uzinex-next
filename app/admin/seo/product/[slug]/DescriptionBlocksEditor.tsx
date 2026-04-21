"use client";

import { useState } from "react";

type Block =
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

/**
 * Editor block-based WordPress-style pentru descriptionBlocks.
 * Suportă paragrafe + tabele. Reorder prin săgeți sus/jos.
 */
export function DescriptionBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  function updateBlock(i: number, next: Block) {
    const copy = [...blocks];
    copy[i] = next;
    onChange(copy);
  }
  function addParagraph(afterIndex?: number) {
    const copy = [...blocks];
    const idx = afterIndex === undefined ? copy.length : afterIndex + 1;
    copy.splice(idx, 0, { type: "paragraph", text: "" });
    onChange(copy);
  }
  function addTable(afterIndex?: number) {
    const copy = [...blocks];
    const idx = afterIndex === undefined ? copy.length : afterIndex + 1;
    copy.splice(idx, 0, {
      type: "table",
      rows: [
        ["Parametru", "Valoare"],
        ["", ""],
      ],
    });
    onChange(copy);
  }
  function removeBlock(i: number) {
    if (!confirm("Ștergi blocul?")) return;
    const copy = [...blocks];
    copy.splice(i, 1);
    onChange(copy);
  }
  function moveUp(i: number) {
    if (i === 0) return;
    const copy = [...blocks];
    [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
    onChange(copy);
  }
  function moveDown(i: number) {
    if (i === blocks.length - 1) return;
    const copy = [...blocks];
    [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
    onChange(copy);
  }
  function toggleCollapse(i: number) {
    setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
            Blocuri descriere (afișate pe pagina produs)
          </label>
          <div className="text-xs text-ink-500 mt-1">
            {blocks.length} blocuri · paragrafe + tabele · reordonabile
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addParagraph()}
            className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition"
          >
            + Paragraf
          </button>
          <button
            type="button"
            onClick={() => addTable()}
            className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition"
          >
            + Tabel
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {blocks.length === 0 && (
          <div className="border-2 border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">
            Niciun bloc. Click pe + Paragraf sau + Tabel pentru a începe.
          </div>
        )}
        {blocks.map((block, i) => (
          <div
            key={i}
            className="border hairline bg-white"
          >
            <div className="flex items-center justify-between px-3 py-2 bg-ink-50 border-b hairline">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-ink-500 font-mono">
                  #{i + 1} · {block.type === "paragraph" ? "Paragraf" : "Tabel"}
                </span>
                {block.type === "paragraph" && (
                  <span className="text-[10px] font-mono text-ink-400">
                    {block.text.length} car.
                  </span>
                )}
                {block.type === "table" && (
                  <span className="text-[10px] font-mono text-ink-400">
                    {block.rows.length}×{block.rows[0]?.length || 0}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="p-1 text-sm hover:bg-white disabled:opacity-30"
                  title="Mută sus"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === blocks.length - 1}
                  className="p-1 text-sm hover:bg-white disabled:opacity-30"
                  title="Mută jos"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => toggleCollapse(i)}
                  className="p-1 text-sm hover:bg-white"
                  title={collapsed[i] ? "Expand" : "Collapse"}
                >
                  {collapsed[i] ? "▸" : "▾"}
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  className="p-1 text-sm text-red-600 hover:bg-red-50"
                  title="Șterge"
                >
                  ✕
                </button>
              </div>
            </div>
            {!collapsed[i] && (
              <div className="p-3">
                {block.type === "paragraph" && (
                  <textarea
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(i, {
                        type: "paragraph",
                        text: e.target.value,
                      })
                    }
                    rows={Math.min(14, Math.max(3, block.text.split("\n").length + 1))}
                    className="w-full border hairline px-3 py-2 text-sm focus:outline-none focus:border-uzx-blue resize-y"
                    placeholder="Text paragraf..."
                  />
                )}
                {block.type === "table" && (
                  <TableEditor
                    rows={block.rows}
                    onChange={(rows) =>
                      updateBlock(i, { type: "table", rows })
                    }
                  />
                )}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t hairline">
                  <button
                    type="button"
                    onClick={() => addParagraph(i)}
                    className="text-[10px] text-uzx-blue hover:underline"
                  >
                    + adaugă paragraf dedesubt
                  </button>
                  <span className="text-ink-300">·</span>
                  <button
                    type="button"
                    onClick={() => addTable(i)}
                    className="text-[10px] text-uzx-blue hover:underline"
                  >
                    + tabel dedesubt
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TableEditor({
  rows,
  onChange,
}: {
  rows: string[][];
  onChange: (rows: string[][]) => void;
}) {
  function updateCell(r: number, c: number, value: string) {
    const copy = rows.map((row) => [...row]);
    copy[r][c] = value;
    onChange(copy);
  }
  function addRow() {
    const cols = rows[0]?.length || 2;
    onChange([...rows, new Array(cols).fill("")]);
  }
  function removeRow(r: number) {
    if (rows.length <= 1) return;
    onChange(rows.filter((_, i) => i !== r));
  }
  function addCol() {
    onChange(rows.map((row) => [...row, ""]));
  }
  function removeCol(c: number) {
    if ((rows[0]?.length || 0) <= 1) return;
    onChange(rows.map((row) => row.filter((_, i) => i !== c)));
  }

  const cols = rows[0]?.length || 0;

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className="border hairline p-0"
                    style={{
                      background: r === 0 ? "#f5f5f5" : "white",
                    }}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      className="w-full px-2 py-1.5 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-uzx-blue"
                      style={{
                        fontWeight: r === 0 ? 600 : 400,
                      }}
                    />
                  </td>
                ))}
                <td className="border hairline w-8 text-center bg-ink-50">
                  <button
                    type="button"
                    onClick={() => removeRow(r)}
                    className="text-red-600 px-1 text-xs hover:bg-red-50"
                    title="Șterge rând"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              {Array.from({ length: cols }).map((_, c) => (
                <td
                  key={c}
                  className="border hairline text-center bg-ink-50 w-8"
                >
                  <button
                    type="button"
                    onClick={() => removeCol(c)}
                    className="text-red-600 px-1 text-[10px] hover:bg-red-50"
                    title="Șterge coloană"
                  >
                    ✕
                  </button>
                </td>
              ))}
              <td className="border hairline"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addRow}
          className="text-[10px] border hairline bg-white px-2 py-1 hover:bg-ink-50"
        >
          + Rând
        </button>
        <button
          type="button"
          onClick={addCol}
          className="text-[10px] border hairline bg-white px-2 py-1 hover:bg-ink-50"
        >
          + Coloană
        </button>
      </div>
    </div>
  );
}
