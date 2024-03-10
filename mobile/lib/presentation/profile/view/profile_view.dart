import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/di/di.dart';
import 'package:flutter_template/presentation/core/widgets/slide_lazy_indexed_stack.dart';
import 'package:flutter_template/presentation/profile/administrative/view/administrative_view.dart';
import 'package:flutter_template/presentation/profile/bloc/profile_bloc.dart';
import 'package:flutter_template/presentation/profile/medical_history/view/medical_history_view.dart';
import 'package:flutter_template/presentation/profile/widgets/segment_control.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ProfileBloc(
        patientRepository: getIt.get<PatientRepository>(),
      ),
      child: const _ProfileView(),
    );
  }
}

class _ProfileView extends StatelessWidget {
  const _ProfileView();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProfileBloc, ProfileState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            actions: [
              IconButton(
                icon: const Icon(Icons.logout_outlined),
                onPressed: () {},
              ),
            ],
          ),
          // fix issue with keyboard and bottom overflow
          resizeToAvoidBottomInset: false,
          body: BlocBuilder<ProfileBloc, ProfileState>(
            builder: (context, state) {
              return Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: context.themeConfig.background,
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
                                children: const [
                                  SegmentControl(),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 3,
                        child: SlideIndexedStack(
                          index: state.currentIndex,
                          children: const [
                            SingleChildScrollView(child: AdministrativeView()),
                            SingleChildScrollView(child: MedicalHistoryView()),
                          ],
                        ),
                      ),
                      // Expanded(
                      //   child: Stack(
                      //     children: [
                      //       Positioned.fill(
                      //         child: CustomButtonList(),
                      //       ),
                      //     ],
                      //   ),
                      // ),
                    ],
                  ),
                ),
              );
            },
            buildWhen: (previous, current) =>
                previous.currentIndex != current.currentIndex,
          ),
        );
      },
    );
  }
}
