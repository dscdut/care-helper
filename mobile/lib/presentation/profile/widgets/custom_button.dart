import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    required this.text,
    required this.width,
    required this.height,
    required this.textSize,
    this.color,
    this.onPressed,
  });

  final String text;
  final double width;
  final double height;
  final double textSize;
  final Color? color;
  final Function()? onPressed;

  static const Color defaultColor = ColorStyles.darkColorButton;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: color ?? defaultColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      onPressed: onPressed ?? () {},
      child: Container(
        width: width,
        height: height,
        alignment: Alignment.center,
        child: Text(
          text,
          style: TextStyle(
            fontSize: textSize,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
