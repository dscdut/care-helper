import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/administrative/widgets/administrative_textformfield.dart';

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
    return const SizedBox(
      height: 650,
      child: Column(
        children: [
          AdministrativeTextFormField(
            labelText: 'Name',
            hintText: 'Enter your name',
            initialValue: '', //Arthur Smith
          ),
          Row(
            children: [
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: 'Date of birth',
                  hintText: 'Enter your date of birth',
                  initialValue: '', // 01/01/1990
                ),
              ),
              SizedBox(width: 4),
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: 'Gender',
                  hintText: 'Enter your gender',
                  initialValue: '', // MALE
                ),
              ),
            ],
          ),
          AdministrativeTextFormField(
            labelText: 'Citizen ID',
            hintText: 'Enter your citizen id',
            initialValue: '', // 1234567890
          ),
          AdministrativeTextFormField(
            labelText: 'Medical insurance ID',
            hintText: 'Enter your insurance id',
            initialValue: '', // 0123456789
          ),
          AdministrativeTextFormField(
            labelText: 'Address',
            hintText: 'Enter your address',
            initialValue: '', // 123 Main Street, New York, NY 10030
          ),
          AdministrativeTextFormField(
            labelText: 'Occupation',
            hintText: 'Enter your occupation',
            initialValue: '', // Software Engineer
          ),
          Row(
            children: [
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: 'Height',
                  hintText: 'Enter your height',
                  initialValue: '', // 180
                ),
              ),
              SizedBox(width: 4),
              Expanded(
                child: AdministrativeTextFormField(
                  labelText: 'Weight',
                  hintText: 'Enter your weight',
                  initialValue: '', // 80
                ),
              ),
            ],
          ),
          AdministrativeTextFormField(
            labelText: 'Recent check up',
            hintText: 'Enter your recent check up',
            initialValue: '', // 01/01/2021
          ),
        ],
      ),
    );
  }
}
