import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/administrative/view/administrative_view.dart';
import 'package:flutter_template/presentation/profile/medical_history/view/medical_history_view.dart';
import 'package:flutter_template/presentation/profile/profile.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_category.dart';
import 'package:flutter_template/router/app_router.dart';

class ProfileDetailView extends StatefulWidget {
  const ProfileDetailView({Key? key}) : super(key: key);

  @override
  State<ProfileDetailView> createState() => _ProfileDetailViewState();
}

class _ProfileDetailViewState extends State<ProfileDetailView> {
  int selectedView = 0;

  void _showAlertDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Notification'),
          content: const Text('The profile information has been updated'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // fix issue with keyboard and bottom overflow
      resizeToAvoidBottomInset: false,
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          color: ColorStyles.background,
        ),
        child: Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Expanded(
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: ListView(
                        children: [
                          CupertinoSegmentedControl<int>(
                            //padding: const EdgeInsets.all(16),
                            selectedColor: ColorStyles.categoryButtonColor,
                            unselectedColor: Colors.white,
                            borderColor: Colors.transparent,
                            groupValue: selectedView,
                            children: const {
                              0: CustomCategory(
                                text: 'Administrative',
                                fontSize: 16,
                              ),
                              1: CustomCategory(
                                text: 'Medical history',
                                fontSize: 16,
                              ),
                            },
                            onValueChanged: (selectedView) {
                              setState(() {
                                this.selectedView = selectedView;
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 3,
                child: selectedView == 0
                    ? const SingleChildScrollView(
                        child: AdministrativeView(),
                      )
                    : const MedicalHistoryView(),
              ),
              Expanded(
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Container(
                            decoration: const BoxDecoration(
                              color: ColorStyles.categoryButtonColor,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(8)),
                            ),
                            child: CustomButton(
                              text: 'Save',
                              width: double.infinity,
                              height: 50,
                              textSize: 16,
                              onPressed: () {
                                _showAlertDialog(context); // Pass context here
                              },
                              color: ColorStyles
                                  .categoryButtonColor, // Set button color to red
                            ),
                          ),
                          const SizedBox(height: 8),
                          Container(
                            decoration: const BoxDecoration(
                              color: ColorStyles.categoryButtonColor,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(8)),
                            ),
                            child: CustomButton(
                              text: 'Back to home',
                              width: double.infinity,
                              height: 50,
                              textSize: 16,
                              onPressed: () {
                                Navigator.pushNamedAndRemoveUntil(
                                  context,
                                  AppRouter.root,
                                  (route) => false,
                                );
                              },
                              color: ColorStyles.categoryButtonColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
