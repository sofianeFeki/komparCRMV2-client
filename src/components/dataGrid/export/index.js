import React, { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LoadingButton from '@mui/lab/LoadingButton';

const Export = () => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      startIcon={<FileDownloadIcon />}
      size="small"
    >
      Exporter
    </LoadingButton>
  );
};

export default Export;
