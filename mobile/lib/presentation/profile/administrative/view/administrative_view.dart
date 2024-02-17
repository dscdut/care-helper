import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';

class AdministrativeView extends StatelessWidget {
  const AdministrativeView({super.key});

  @override
  Widget build(BuildContext context) {
    return const MyView();
  }
}

class MyView extends StatelessWidget {
  const MyView({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_name.tr(),
              hintText: 'Enter your name',
            ),
          ),
          Row(
            children: [
              TextFormField(
                decoration: InputDecoration(
                  labelText: LocaleKeys.profile_dob.tr(),
                  hintText: 'Enter your date of birth',
                ),
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: LocaleKeys.profile_sex.tr(),
                  hintText: 'Enter your sex',
                ),
              ),
            ],
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_citizen_id.tr(),
              hintText: 'Enter your citizen id',
            ),
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_insurance_id.tr(),
              hintText: 'Enter your insurance id',
            ),
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_address.tr(),
              hintText: 'Enter your address',
            ),
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_occupation.tr(),
              hintText: 'Enter your occupation',
            ),
          ),
          Row(
            children: [
              TextFormField(
                decoration: InputDecoration(
                  labelText: LocaleKeys.profile_height.tr(),
                  hintText: 'Enter your height',
                ),
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: LocaleKeys.profile_weight.tr(),
                  hintText: 'Enter your weight',
                ),
              ),
            ],
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: LocaleKeys.profile_check_up.tr(),
              hintText: 'Enter your recent check up',
            ),
          ),
        ],
      ),
    );
  }
}
