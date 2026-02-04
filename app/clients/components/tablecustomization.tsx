{/* <motion.div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              className="bg-white w-[350px] max-h-screen rounded-2xl p-6 h-full border-l"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Table customization</h2>
                  <p className="text-sm text-[#667085]">
                    A minimum of 8 columns must be visible
                  </p>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => setShowCustomize(false)}
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col justify-between h-[86vh] border-t prb-2 py-4 overflow-y-auto">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragStart={(event) => {
                    setActiveId(event.active.id as string);
                  }}
                  onDragEnd={(event) => {
                    const { active, over } = event;
                    setActiveId(null);
                    if (!over || active.id === over.id) return;

                    setColumnOrder((items) => {
                      const oldIndex = items.indexOf(active.id as string);
                      const newIndex = items.indexOf(over.id as string);
                      return arrayMove(items, oldIndex, newIndex);
                    });
                  }}
                >
                  <SortableContext
                    items={columnOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnOrder.map((key) => {
                      const col = ALL_COLUMNS.find((c) => c.key === key)!;
                      const checked = visibleColumns.includes(col.key);

                      return (
                        <SortableColumnRow
                          key={col.key}
                          column={col}
                          checked={checked}
                          disabled={col.mandatory ?? false}
                          onToggle={(v) => {
                            if (!v && visibleColumns.length <= 7) return;
                            setVisibleColumns((prev) =>
                              v
                                ? [...prev, col.key]
                                : prev.filter((k) => k !== col.key),
                            );
                          }}
                        />
                      );
                    })}
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <ColumnRowContent
                        column={ALL_COLUMNS.find((c) => c.key === activeId)!}
                        checked={visibleColumns.includes(activeId)}
                        disabled={
                          ALL_COLUMNS.find((c) => c.key === activeId)
                            ?.mandatory ?? false
                        }
                        onToggle={() => {}}
                      />
                    ) : null}
                  </DragOverlay>

                  <div className="flex justify-between pt-5 border-t">
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => {
                        const defaults = ALL_COLUMNS.filter(
                          (c) => c.mandatory,
                        ).map((c) => c.key);

                        setVisibleColumns(defaults);
                        setColumnOrder(ALL_COLUMNS.map((c) => c.key));
                        localStorage.removeItem(STORAGE_KEY);
                        localStorage.removeItem("clients_table_column_order");
                      }}
                    >
                      Reset
                    </Button>

                    <Button
                      className="bg-[#A7E55C] text-black hover:bg-[#A7E55C] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem(
                          STORAGE_KEY,
                          JSON.stringify(visibleColumns),
                        );
                        localStorage.setItem(
                          "clients_table_column_order",
                          JSON.stringify(columnOrder),
                        );
                        setShowCustomize(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </DndContext>
              </div>
            </motion.div>
          </motion.div> */}