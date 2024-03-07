import 'dart:developer';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/constants/hive_keys.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_request_dto.dart';
import 'package:flutter_template/data/models/patient_model.dart';
import 'package:flutter_template/di/di.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/bloc/profile_bloc.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:hive/hive.dart';

class CustomButtonList extends StatelessWidget {
  CustomButtonList({
    super.key,
  });

  final Box authBox = getIt.get<Box>(instanceName: HiveKeys.authBox);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProfileBloc, ProfileState>(
      builder: (context, state) {
        return Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            CustomButton(
              text: LocaleKeys.action_save.tr(),
              width: double.infinity,
              height: 50,
              textSize: 16,
              color: context.themeConfig.categoryButtonColor,
              onPressed: () {
                final PatientModel patient =
                    authBox.get(HiveKeys.updatedPatient);
                log('update patient in hive $patient.toJson()');
                context.read<ProfileBloc>().add(
                      UpdatePatientInfoEvent(
                        UpdatePatientRequestDTO(
                          fullName: patient.fullName ?? '',
                          gender: patient.gender ?? '',
                          birthday: patient.birthday ?? DateTime.now(),
                          address: patient.address ?? '',
                          nationalIdCard: patient.nationalIdCard ?? '',
                          insurance: patient.insurance ?? '',
                          profesion: patient.profesion ?? '',
                          height: patient.height ?? 160,
                          weight: patient.weight ?? 50,
                        ),
                      ),
                    );
              },
            ),
            const SizedBox(height: 8),
            CustomButton(
              text: LocaleKeys.action_back_to_home.tr(),
              width: double.infinity,
              height: 50,
              textSize: 16,
              color: context.themeConfig.categoryButtonColor,
            ),
          ],
        );
      },
    );
  }
}
