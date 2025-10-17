import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setSituations } from "../../store/slices/form-slice";
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { aiSuggest } from '../../api';
import i18n from "i18next";

export default function Step3Situations({ onBack, onNext }) {
  const { t } = useTranslation();
  const situations = useSelector(s => s.form.situations);
  const family = useSelector(s => s.form.family);
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: situations });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldKey, setFieldKey] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');
  const language = i18n.language;

  const handleHelp = async (key) => {
    setError('');
    setFieldKey(key);
    setLoading(true);
    setOpen(true);
    const prompts = {
      financialSituation: `
      The user is ${family.maritalStatus} and currently ${family.employmentStatus}, 
      with ${family.dependents} dependents relying on them financially. This is to seek financial support.
      Write a clear, respectful, and concise paragraph describing their current financial situation for this form. 
      Avoid exaggeration or emotional language — keep the tone factual, humble, and polite. 
      Limit to 4–6 sentences. 
      If no dependents then do not mention anything about dependents.`,
      employmentCircumstances: `
      You are an AI writing assistant helping a user complete a social support application form.
      Use the following context from the form:
      - Marital Status: ${family.maritalStatus || 'Not specified'}
      - Number of Dependents: ${family.dependents || 0}
      - Current Employment Status: ${family.employmentStatus || 'Unemployed'}
      - Monthly Income: ${family.monthlyIncome || 'Not specified'}
      - Housing Status: ${family.housingStatus || 'Not specified'}

      Write a clear, respectful, and concise paragraph describing the user's employment circumstances, 
      including any recent changes (such as job loss, reduced hours, or unstable work).  
      Use a formal yet empathetic tone suitable for a social-service application.  
      Avoid exaggeration or emotional language — focus on clarity and facts.  
      Limit the response to 4–6 sentences.
       If no dependents then do not mention anything about dependents.
       Write the paragraph in the **first person**, as if the applicant is personally describing their own situation (using “I” statements like “I am unemployed” or “I recently lost my job”).  
       Keep the tone polite, factual, and respectful — suitable for an official support application.  
      Avoid exaggeration or emotional language; focus on clarity and sincerity. 
      `,
      reasonForApplying: `
      You are an AI writing assistant helping a user complete a social support application form.

      Use the following context from the form:
      - Marital Status: ${family.maritalStatus || 'Not specified'}
      - Number of Dependents: ${family.dependents || 0}
      - Current Employment Status: ${family.employmentStatus || 'Not specified'}
      - Monthly Income: ${family.monthlyIncome || 'Not specified'}
      - Housing Status: ${family.housingStatus || 'Not specified'}

      Write a polite and genuine paragraph explaining the reason the user is applying for social support. 
      Emphasize that they are currently ${family.employmentStatus || 'not employed'} with ${family.dependents || 0} dependents relying on them, 
      and that temporary financial assistance would help ensure their family’s basic needs and stability. 
      Highlight their willingness to improve their circumstances and their appreciation for any support provided. 
      Keep the tone sincere, factual, and respectful, and limit the response to 4–6 sentences. If no dependents then do not mention anything about dependents.
      Write the paragraph in the **first person**, as if the applicant is personally describing their own situation (using “I” statements like “I am unemployed” or “I recently lost my job”).  `
    };
    const res = await aiSuggest(prompts[key], language);
    setLoading(false);
    if (res.ok) {
      setSuggestion(res.text);
    } else {
      setError(t("situations.errorGenerating"));
    }
  };

  const accept = () => {
    setValue(fieldKey, suggestion);
    setOpen(false);
  };

  const onSubmit = (data) => {
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
          {loading ? "...please wait, AI assisstant is generating the response for you" : error || suggestion}
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