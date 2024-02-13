import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';

class AdministrativeView extends StatefulWidget {
  const AdministrativeView({super.key});

  @override
  State<AdministrativeView> createState() => _AdministrativeViewState();
}

class _AdministrativeViewState extends State<AdministrativeView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              ColorStyles.primaryColor,
              ColorStyles.secondaryColor,
            ],
          ),
        ),
      ),
    );
  }
}
