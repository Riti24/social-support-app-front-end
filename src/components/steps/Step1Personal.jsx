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
import { useDispatch, useSelector } from "react-redux";
import { setPersonal } from "../../store/slices/form-slice";

export default function Step1Personal({ onNext }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const personal = useSelector((s) => s.form.personal);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: personal,
  });

  const onSubmit = (data) => {
    dispatch(setPersonal(data));
    onNext();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100vw",
        maxWidth: 900,
        backgroundColor: "ghostwhite",
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: 1,
        "& .MuiTextField-root": { width: "100%" },
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        {t("personal.title") || "Personal Information"}
      </Typography>

      <Grid container spacing={2}>
        {/* Full Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.fullName")}
            {...register("fullName", {
              required: `${t("personal.fullName")} is required`,
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Grid>

        {/* National ID */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.nationalId")}
            {...register("nationalId", {
              required: `${t("personal.nationalId")} is required`,
              pattern: {
                value: /^[0-9]{10,14}$/,
                message: `${t("personal.nationalId")} must be numeric`,
              },
            })}
            error={!!errors.nationalId}
            helperText={errors.nationalId?.message}
          />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label={t("personal.dob")}
            InputLabelProps={{ shrink: true }}
            {...register("dob", {
              required: `${t("personal.dob")} is required`,
            })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        </Grid>

        {/* Gender (Using Controller to fix validation glitch) */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="gender"
            control={control}
            rules={{
              required: `${t("personal.gender")} is required`,
            }}
            render={({ field }) => (
              <TextField
                select
                label={t("personal.gender")}
                {...field}
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
                <MenuItem value="">{t("personal.selectGender")}</MenuItem>
                <MenuItem value="male">{t("personal.male")}</MenuItem>
                <MenuItem value="female">{t("personal.female")}</MenuItem>
                <MenuItem value="other">{t("personal.other")}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <TextField
            label={t("personal.address")}
            {...register("address", {
              required: `${t("personal.address")} is required`,
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        {/* City */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.city")}
            {...register("city", {
              required: `${t("personal.city")} is required`,
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.state")}
            {...register("state", {
              required: `${t("personal.state")} is required`,
            })}
            error={!!errors.state}
            helperText={errors.state?.message}
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.country")}
            {...register("country", {
              required: `${t("personal.country")} is required`,
            })}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t("personal.phone")}
            {...register("phone", {
              required: `${t("personal.phone")} is required`,
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: `${t("personal.phone")} is invalid`,
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            label={t("personal.email")}
            {...register("email", {
              required: `${t("personal.email")} is required`,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: `${t("personal.email")} is invalid`,
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button type="submit" variant="contained">
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
}
