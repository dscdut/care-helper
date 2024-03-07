import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/bloc/profile_bloc.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_category.dart';

class SegmentControl extends StatelessWidget {
  const SegmentControl({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProfileBloc, ProfileState>(
      builder: (context, state) {
        return CupertinoSegmentedControl<int>(
          //padding: const EdgeInsets.all(16),
          selectedColor: context.themeConfig.categoryButtonColor,
          unselectedColor: Colors.white,
          borderColor: Colors.transparent,
          groupValue: state.currentIndex,
          children: {
            0: CustomCategory(
              text: LocaleKeys.profile_adminis.tr(),
            ),
            1: CustomCategory(
              text: LocaleKeys.profile_medical.tr(),
            ),
          },
          onValueChanged: (selectedView) {
            context.read<ProfileBloc>().add(
                  SegmentedControlTabChange(
                    newIndex: selectedView,
                  ),
                );
          },
        );
      },
    );
  }
}
