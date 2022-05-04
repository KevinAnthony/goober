import React, { ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  Paper,
  TextField,
} from "@mui/material";
import { SearchNet } from "../../net/search";
import { BinObj } from "../../model/bin";

interface searchProps {
  closedCallback: () => void;
  foundCallback: (bin: BinObj) => void;
}

export const SearchBox = ({ closedCallback, foundCallback }: searchProps) => {
  const searchNet = new SearchNet();
  const [query, setQuery] = React.useState("");

  const [results, setResults] = React.useState(() => Array<BinObj>());
  const [resultList, _] = React.useState<JSX.Element>(<List />);

  React.useEffect(() => {
    {
      results.map((bin: BinObj, _: number) => (
        <Button
          variant="outlined"
          style={{
            width: "100%",
          }}
        >
          {bin.getText(0)}
        </Button>
      ));
    }
  }, [results]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        searchNet.searchText(query).then(function (b) {
          setResults(b);
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [query]);

  const [open, setOpen] = React.useState(true);

  return (
    <div
      style={{
        // position: "absolute",
        width: "1192px",
        backgroundColor: "rgb(77,77,77,1)",
      }}
    >
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        // onClose={closedCallback}
      >
        <DialogTitle>Search</DialogTitle>
        <div
          style={{
            margin: "1em",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            variant="outlined"
            label="Search"
            defaultValue={""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              console.log("set query", target.value);
              setQuery(target.value);
            }}
            style={{
              width: "500px",
              paddingBottom: "10px",
            }}
          />
          <Paper style={{ maxHeight: 800, overflow: "auto" }}>
            {resultList}
            <List>
              {results.map((bin: BinObj, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => {
                    setOpen(false);
                    foundCallback(bin);
                    closedCallback();
                  }}
                >
                  {bin.getSearchText(0)}
                </Button>
              ))}
            </List>
          </Paper>
          <Button
            variant="outlined"
            style={{
              width: "100%",
            }}
            onClick={() => {
              setOpen(false);
              closedCallback();
            }}
          >
            close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
