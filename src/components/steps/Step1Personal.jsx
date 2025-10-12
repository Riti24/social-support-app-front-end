import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setFormData } from "../../store/slices/form-slice";

export default function Step1Personal({ onNext }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ✅ Toggle to enable/disable validation if needed
  const [isValidationEnabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Step 1 form data →", data);
    dispatch(setFormData(data));
    onNext();
  };

  const rule = (rules) => (isValidationEnabled ? rules : {});

  return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100vw",
          maxWidth: 900, // ✅ Prevents overly wide layouts
          backgroundColor: "ghostwhite",
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: 1,
          "& .MuiTextField-root": { width: "100%" }, // ✅ Fix shrinking
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {t("personal.title") || "Personal Information"}
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.fullName") || "Full Name"}
              {...register(
                "fullName",
                rule({ required: t("personal.fullName") + " is required" })
              )}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          </Grid>

          {/* National ID */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.nationalId") || "National ID"}
              {...register(
                "nationalId",
                rule({
                  required: t("personal.nationalId") + " is required",
                  pattern: {
                    value: /^[0-9]{10,14}$/,
                    message: t("personal.nationalId") + " must be numeric",
                  },
                })
              )}
              error={!!errors.nationalId}
              helperText={errors.nationalId?.message}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label={t("personal.dob") || "Date of Birth"}
              InputLabelProps={{ shrink: true }}
              {...register(
                "dob",
                rule({ required: t("personal.dob") + " is required" })
              )}
              error={!!errors.dob}
              helperText={errors.dob?.message}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label={t("personal.gender") || "Gender"}
              defaultValue=""
              {...register(
                "gender",
                rule({ required: t("personal.gender") + " is required" })
              )}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <MenuItem value="">{t("personal.selectGender")}</MenuItem>
              <MenuItem value="male">{t("personal.male")}</MenuItem>
              <MenuItem value="female">{t("personal.female")}</MenuItem>
              <MenuItem value="other">{t("personal.other")}</MenuItem>
            </TextField>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label={t("personal.address") || "Address"}
              {...register(
                "address",
                rule({ required: t("personal.address") + " is required" })
              )}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.city") || "City"}
              {...register(
                "city",
                rule({ required: t("personal.city") + " is required" })
              )}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.state") || "State"}
              {...register(
                "state",
                rule({ required: t("personal.state") + " is required" })
              )}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.country") || "Country"}
              {...register(
                "country",
                rule({ required: t("personal.country") + " is required" })
              )}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("personal.phone") || "Phone"}
              {...register(
                "phone",
                rule({
                  required: t("personal.phone") + " is required",
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: t("personal.phone") + " is invalid",
                  },
                })
              )}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label={t("personal.email") || "Email"}
              {...register(
                "email",
                rule({
                  required: t("personal.email") + " is required",
                  pattern: {
                    value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
                    message: t("personal.email") + " is invalid",
                  },
                })
              )}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button type="submit" variant="contained">
            {t("next") || "Next"}
          </Button>
        </Box>
      </Box>
  );
}
