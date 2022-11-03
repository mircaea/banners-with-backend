import { Button, Input, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { BannerType } from "../../../firebase/types";
import useFirestore from "../../../hooks/use-firestore";

interface BannerEditProps {
  item: BannerType;
  handleDelete: () => void;
  handleDeselect: () => void;
}

function BannersEdit({ item, handleDelete, handleDeselect }: BannerEditProps) {
  const { saveBanner } = useFirestore();
  const [text, setText] = useState("");
  const [file, setFile] = useState<any>();

  useEffect(() => {
    setText(item?.text);
  }, [item]);

  const handleChangeText = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(ev.target.value);

  const handleFileSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev?.target?.files?.[0];
    if (file) setFile(file);
  };

  const handleSave = async () => {
    await saveBanner({ ...item, text }, file);
    handleDeselect();
  };

  return (
    <>
      <br />
      <p>{item?.id ? `Edit banner: ${item?.text}` : "Create new banner"}</p>
      <br />

      <Stack spacing={2}>
        <Stack spacing={2}>
          <TextField
            required
            value={text}
            label="Text"
            size="small"
            placeholder="Enter text"
            onChange={handleChangeText}
            fullWidth={true}
          />
          <Input
            onChange={handleFileSelect}
            type="file"
            disableUnderline={true}
            // accept="image/*"
          />
        </Stack>

        <div className="FullWidthBottomBorder" />

        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDeselect}>
            Cancel
          </Button>
          {item?.id && (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete this banner
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default BannersEdit;
