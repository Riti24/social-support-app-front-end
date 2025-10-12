import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/slices/form-slice';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { aiSuggest } from '../../api';

export default function Step3Situations({ onBack, onNext }){
  const { t } = useTranslation();
  const situations = useSelector(s=>s.form.situations);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues: situations });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldKey, setFieldKey] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');

  const handleHelp = async (key)=>{
    setError('');
    setFieldKey(key);
    setLoading(true);
    setOpen(true);
    const prompts = {
      financialSituation: "Help me describe my current financial situation clearly and respectfully.",
      employmentCircumstances: "Help me describe my employment circumstances, including recent changes.",
      reasonForApplying: "Help me write the reason I am applying for social support."
    };
    const res = await aiSuggest(prompts[key]);
    setLoading(false);
    if(res.ok){
      setSuggestion(res.text);
    } else {
      setError(t("situations.errorGenerating"));
    }
  };

  const accept = ()=>{
    setValue(fieldKey, suggestion);
    setOpen(false);
  };

  const onSubmit = (data)=>{
    dispatch(setFormData(data));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label={t('situationDescriptions')}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={4} label={t("situations.financialSituation")} {...register('financialSituation')} />
          <Button sx={{ mt:1 }} variant="outlined" onClick={()=>handleHelp('financialSituation')}>{t('helpMeWrite')}</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={4} label={t("situations.employmentCircumstances")} {...register('employmentCircumstances')} />
          <Button sx={{ mt:1 }} variant="outlined" onClick={()=>handleHelp('employmentCircumstances')}>{t('helpMeWrite')}</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={4} label={t('situations.reasonForApplying')} {...register('reasonForApplying')} />
          <Button sx={{ mt:1 }} variant="outlined" onClick={()=>handleHelp('reasonForApplying')}>{t('helpMeWrite')}</Button>
        </Grid>
        <Grid item xs={12} sx={{ display:'flex', justifyContent:'space-between' }}>
          <Button variant="outlined" onClick={onBack}>{t('back')}</Button>
          <Button variant="contained" type="submit">{t('review')}</Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t('generatedSuggestion')}</DialogTitle>
        <DialogContent dividers>
          {loading ? '...' : (error || suggestion)}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>{t('discard')}</Button>
          <Button onClick={()=>setSuggestion((watch(fieldKey)||'') + '\n' + suggestion)}>{t('edit')}</Button>
          <Button onClick={accept} variant="contained">{t('accept')}</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}