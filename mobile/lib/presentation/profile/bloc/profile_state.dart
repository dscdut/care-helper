part of 'profile_bloc.dart';

class ProfileState extends Equatable {
  const ProfileState({
    this.currentIndex = 0,
    this.isLoading = false,
    this.patient,
    this.error = '',
    this.history,
  });

  final int currentIndex;
  final bool isLoading;
  final PatientModel? patient;
  final String error;
  final String? history;

  @override
  List<Object> get props => [currentIndex];

  ProfileState copyWith({
    int? currentIndex,
    bool? isLoading,
    PatientModel? patient,
    String? error,
    String? history,
  }) {
    return ProfileState(
      currentIndex: currentIndex ?? this.currentIndex,
      isLoading: isLoading ?? this.isLoading,
      patient: patient ?? this.patient,
      error: error ?? this.error,
      history: history ?? this.history,
    );
  }
}
