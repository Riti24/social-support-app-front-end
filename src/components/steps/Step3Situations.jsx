import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setSituations } from "../../store/slices/form-slice";
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { aiSuggest } from '../../api';

export default function Step3Situations({ onBack, onNext }){
  const { t } = useTranslation();
  const situations = useSelector(s=>s.form.situations);
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: situations });

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
    dispatch(setSituations(data));
    onNext();
  };

 return (
  <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "ghostwhite",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Grid container spacing={2}>
        {/* Financial Situation */}
        <Grid item xs={12}>
          <Controller
            name="financialSituation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                aria-label={t("situationDescriptions")}
                minRows={4}
                label={t("situations.financialSituation")}
                placeholder={t("situations.financialSituation")}
              />
            )}
          />
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={() => handleHelp("financialSituation")}
          >
            {t("helpMeWrite")}
          </Button>
        </Grid>

        {/* Employment Circumstances */}
        <Grid item xs={12}>
          <Controller
            name="employmentCircumstances"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                label={t("situations.employmentCircumstances")}
                placeholder={t("situations.employmentCircumstances")}
              />
            )}
          />
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={() => handleHelp("employmentCircumstances")}
          >
            {t("helpMeWrite")}
          </Button>
        </Grid>

        {/* Reason for Applying */}
        <Grid item xs={12}>
          <Controller
            name="reasonForApplying"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                minRows={4}
                label={t("situations.reasonForApplying")}
                placeholder={t("situations.reasonForApplying")}
              />
            )}
          />
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={() => handleHelp("reasonForApplying")}
          >
            {t("helpMeWrite")}
          </Button>
        </Grid>

        {/* Navigation Buttons */}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="outlined" onClick={onBack}>
            {t("back")}
          </Button>
          <Button variant="contained" type="submit">
            {t("review")}
          </Button>
        </Grid>
      </Grid>

      {/* Suggestion Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t("generatedSuggestion")}</DialogTitle>
        <DialogContent dividers>
          {loading ? "..." : error || suggestion}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t("discard")}</Button>
          <Button
            onClick={() =>
              setSuggestion((watch(fieldKey) || "") + "\n" + suggestion)
            }
          >
            {t("edit")}
          </Button>
          <Button onClick={accept} variant="contained">
            {t("accept")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}