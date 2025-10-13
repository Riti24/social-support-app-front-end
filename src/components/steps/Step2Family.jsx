import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFamily } from "../../store/slices/form-slice";

export default function Step2Family({ onBack, onNext }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const family = useSelector((s) => s.form.family) || {};

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: family,
  });

  const onSubmit = (data) => {
    dispatch(setFamily(data));
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
      <Typography variant="h6" sx={{ mb: 3 }}>
        {t("family.title") || "Family and Financial Details"}
      </Typography>

      <Grid container spacing={2}>
        {/* Marital Status */}
        <Grid item xs={12} md={6}>
          <Controller 
            name="maritalStatus"
            control={control}
            rules={{
              required: `${t("family.maritalStatus")} is required`,
            }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label={t("family.maritalStatus")}
                {...field}
                error={!!errors.maritalStatus}
                helperText={errors.maritalStatus?.message}
              >
                <MenuItem value="">{t("family.selectMaritalStatus")}</MenuItem>
                <MenuItem value="single">{t("family.single")}</MenuItem>
                <MenuItem value="married">{t("family.married")}</MenuItem>
                <MenuItem value="widowed">{t("family.widowed")}</MenuItem>
                <MenuItem value="divorced">{t("family.divorced")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Dependents */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label={t("family.dependents")}
            {...register("dependents", {
              required: `${t("family.dependents")} is required`,
              min: { value: 0, message: "Cannot be negative" },
            })}
            error={!!errors.dependents}
            helperText={errors.dependents?.message}
          />
        </Grid>

        {/* Employment Status */}
        <Grid item xs={12} md={6}>
          <Controller
            name="employmentStatus"
            control={control}
            rules={{
              required: `${t("family.employmentStatus")} is required`,
            }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label={t("family.employmentStatus")}
                {...field}
                error={!!errors.employmentStatus}
                helperText={errors.employmentStatus?.message}
              >
                <MenuItem value="">{t("family.selectEmployment")}</MenuItem>
                <MenuItem value="employed">{t("family.employed")}</MenuItem>
                <MenuItem value="unemployed">{t("family.unemployed")}</MenuItem>
                <MenuItem value="student">{t("family.student")}</MenuItem>
                <MenuItem value="retired">{t("family.retired")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Monthly Income */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label={t("family.monthlyIncome")}
            {...register("monthlyIncome", {
              required: `${t("family.monthlyIncome")} is required`,
              min: { value: 0, message: "Cannot be negative" },
            })}
            error={!!errors.monthlyIncome}
            helperText={errors.monthlyIncome?.message}
          />
        </Grid>

        {/* Spouse Income */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label={t("family.spouseIncome")}
            {...register("spouseIncome")}
          />
        </Grid>

        {/* Other Income */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("family.otherIncome")}
            {...register("otherIncome")}
          />
        </Grid>

        {/* Housing Type */}
        <Grid item xs={12} md={6}>
          <Controller
            name="housingType"
            control={control}
            rules={{
              required: `${t("family.housingType")} is required`,
            }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label={t("family.housingType")}
                {...field}
                error={!!errors.housingType}
                helperText={errors.housingType?.message}
              >
                <MenuItem value="">{t("family.selectHousing")}</MenuItem>
                <MenuItem value="owned">{t("family.owned")}</MenuItem>
                <MenuItem value="rented">{t("family.rented")}</MenuItem>
                <MenuItem value="governmentHousing">
                  {t("family.governmentHousing")}
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          {t("back") || "Back"}
        </Button>
        <Button variant="contained" type="submit">
          {t("next") || "Next"}
        </Button>
      </Box>
    </Box>
  );
}
