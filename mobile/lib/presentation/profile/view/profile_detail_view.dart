import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_category.dart';

class ProfileDetailView extends StatefulWidget {
  const ProfileDetailView({super.key});

  @override
  State<ProfileDetailView> createState() => _ProfileDetailViewState();
}

class _ProfileDetailViewState extends State<ProfileDetailView> {
  int selectedView = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              ColorStyles.primaryColor,
              ColorStyles.secondaryColor,
            ],
          ),
        ),
        child: Column(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.2,
              width: double.infinity,
              child: ListView(
                children: [
                  CupertinoSegmentedControl<int>(
                    padding: const EdgeInsets.all(16),
                    selectedColor: ColorStyles.categoryButtonColor,
                    unselectedColor: Colors.white,
                    borderColor: Colors.transparent,
                    groupValue: selectedView,
                    children: const {
                      0: CustomCategory(
                        text: 'Hanh chinh',
                        fontSize: 16,
                      ),
                      1: CustomCategory(
                        text: 'Benh su',
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
            SizedBox(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.7,
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(30),
                    bottomRight: Radius.circular(30),
                  ),
                ),
                child: const Text('part 2'),
              ),
            ),
            const SizedBox(
              child: Column(
                children: [
                  CustomButton(
                    text: 'Thoat',
                    width: double.infinity,
                    height: 50,
                    textSize: 16,
                  ),
                  CustomButton(
                    text: 'Luu',
                    width: double.infinity,
                    height: 50,
                    textSize: 16,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
