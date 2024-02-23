import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/widgets/common_icon_button.dart';

class CommonBackButton extends StatelessWidget {
  const CommonBackButton({
    super.key,
    this.hasBoxDecoration = true,
  });
  final bool hasBoxDecoration;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context).pop(),
      child: Container(
        constraints: const BoxConstraints(
          maxWidth: 40,
          maxHeight: 40,
        ),
        decoration: hasBoxDecoration
            ? BoxDecoration(
                color: ColorStyles.backgroundAppbar,
                borderRadius: BorderRadius.circular(5),
              )
            : const BoxDecoration(),
        child: const Icon(
          Icons.chevron_left_outlined,
          color: ColorStyles.zodiacBlue,
          size: 35,
        ),
      ),
    );
  }
}
