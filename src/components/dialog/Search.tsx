import React, { ChangeEvent } from "react";
import { SearchNet } from "../../net/search";
import { BinObj } from "../../model/bin";
import { Dialog } from "../Dialog";
import { TextBox } from "../TextBox";

interface searchProps {
  closedCallback: () => void;
  foundCallback: (bin: BinObj) => void;
}

export const SearchBox = ({ closedCallback, foundCallback }: searchProps) => {
  const [searchNet] = React.useState(new SearchNet());
  const [query, setQuery] = React.useState("");

  const [results, setResults] = React.useState(() => Array<BinObj>());

  React.useEffect(() => {
    results.map((bin: BinObj, _: number) => (
      <button
        style={{
          width: "100%",
        }}
      >
        {bin.GetEdit(0)}
      </button>
    ));
  }, [results]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        searchNet.searchText(query).then(function (b: BinObj[]) {
          setResults(b);
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [query, searchNet]);

  const [open, setOpen] = React.useState(true);

  return (
    <div
      style={{
        width: "1192px",
        backgroundColor: "rgb(77,77,77,1)",
      }}
    >
      <Dialog opened={open} onClose={closedCallback} title="Search">
        <div
          style={{
            margin: "1em",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextBox
            id="search"
            label="Search"
            defaultValue={""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              setQuery(target.value);
            }}
            style={{
              minWidth: "500px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "20px",
              paddingBottom: "30px",
            }}
          >
            {results.map((bin: BinObj, index: number) => (
              <button
                key={index}
                style={{
                  width: "100%",
                  fontSize: "1em",
                }}
                onClick={() => {
                  setOpen(false);
                  foundCallback(bin);
                  closedCallback();
                }}
              >
                {bin.SearchText(0)}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              closedCallback();
            }}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
};
