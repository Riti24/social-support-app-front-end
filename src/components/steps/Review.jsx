import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Paper, Box } from '@mui/material';
import { submitApplication } from '../../api';
import { reset } from '../../store/slices/form-slice';
import { useTranslation } from 'react-i18next';

export default function Review({ onBack }){
  const { t } = useTranslation();
  const data = useSelector(s=>s.form);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async ()=>{
    setSubmitting(true);
    const res = await submitApplication(data);
    setSubmitting(false);
    setResult(res.data);
    dispatch(reset());
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>{t('review')}</Typography>
      <Paper variant="outlined" sx={{ p:2, mb:2 }}>
        <pre style={{ whiteSpace:'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
      </Paper>
      <Box sx={{ display:'flex', justifyContent:'space-between' }}>
        <Button variant="outlined" onClick={onBack}>{t('back')}</Button>
        <Button variant="contained" onClick={submit} disabled={submitting}>{t('submit')}</Button>
      </Box>
      {result && <Typography sx={{ mt:2 }}>Submitted! Reference: {result.id}</Typography>}
    </Box>
  );
}