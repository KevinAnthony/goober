import React, { ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SearchNet } from "../../net/search";
import { BinObj } from "../../model/bin";

interface searchProps {
  closedCallback: () => void;
  foundCallback: (bin: BinObj) => void;
}

export const SearchBox = ({ closedCallback, foundCallback }: searchProps) => {
  const [searchNet] = React.useState(new SearchNet());
  const [query, setQuery] = React.useState("");

  const [results, setResults] = React.useState(() => Array<BinObj>());
  const [resultList] = React.useState<JSX.Element>(<List />);

  React.useEffect(() => {
    results.map((bin: BinObj, _: number) => (
      <Button
        variant="outlined"
        style={{
          width: "100%",
        }}
      >
        <Typography>{bin.Text(0)}</Typography>
      </Button>
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
                  {bin.SearchText(0)}
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
            <Typography>Close</Typography>
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
