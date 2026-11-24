import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import {
  Zap,
  Target,
  Trophy,
  Flame,
  LogOut,
  Award,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  Eye,
  X,
  Heart,
  Clock,
  RotateCcw,
  GraduationCap,
  BookOpen,
  Users,
  HelpCircle,
  Plus,
  Mail,
  AlertTriangle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { Avatar3D } from "../types";
import { HeartDisplay } from "../components/HeartDisplay";
import { ButtonCustom } from "../components/ButtonCustom";

export function TelaPerfil() {
  const {
    levelInfo,
    setSelectedAvatarId,
    lives,
    maxLives,
    rechargeHoursRemaining,
    rechargeLives,
    loseLife,
    logout,
    userRole,
    setUserRole,
    setCurrentTab,
    classStudents,
    createdQuestions,
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<"avatars" | "badges" | "lives">("lives");
  const [activeTeacherTab, setActiveTeacherTab] = useState<"turmas" | "institucional">("turmas");
  const [inspectAvatar, setInspectAvatar] = useState<Avatar3D | null>(null);

  // ==================== VISÃO EXCLUSIVA DO PROFESSOR ====================
  if (userRole === "teacher") {
    const infrequentCount = classStudents.filter((s) => s.lastActiveDaysAgo > 7).length;
    const frequentCount = classStudents.filter((s) => s.lastActiveDaysAgo <= 7).length;
    const frequencyRate = classStudents.length > 0 ? Math.round((frequentCount / classStudents.length) * 100) : 100;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Card de Identidade do Docente */}
        <View style={styles.teacherProfileCard}>
          <LinearGradient
            colors={["#2b135e", "#190c38"]}
            style={styles.teacherCardGradient}
          >
            <View style={styles.teacherHeaderRow}>
              {/* Avatar Acadêmico com Badge de Docente */}
              <View style={styles.teacherAvatarBox}>
                <GraduationCap size={36} color="#facc15" />
                <View style={styles.teacherStatusDot} />
              </View>

              <View style={styles.teacherMetaCol}>
                <View style={styles.teacherNameRow}>
                  <Text style={styles.teacherName}>Prof. Me. Rodrigo Medeiros</Text>
                  <ShieldCheck size={16} color="#4ade80" />
                </View>
                <Text style={styles.teacherRoleTitle}>Docente Titular · Faculdade CCI</Text>
                <Text style={styles.teacherDepartment}>
                  Deptº de Tecnologia e Desenvolvimento de Sistemas (ADS)
                </Text>

                <View style={styles.teacherBadgesRow}>
                  <View style={styles.teacherBadgePill}>
                    <Text style={styles.teacherBadgePillText}>Matrícula: DOC-2024-089</Text>
                  </View>
                  <View style={[styles.teacherBadgePill, styles.teacherBadgePillActive]}>
                    <Text style={styles.teacherBadgePillActiveText}>Semestre 2026.1</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Email Institucional */}
            <View style={styles.teacherEmailBox}>
              <Mail size={13} color="#a78bfa" />
              <Text style={styles.teacherEmailText}>professor@portalcci.com.br</Text>
            </View>
          </LinearGradient>
        </View>

        {/* 2. KPIs Acadêmicos */}
        <View style={styles.teacherKpiGrid}>
          <View style={styles.teacherKpiItem}>
            <Users size={16} color="#38bdf8" />
            <Text style={styles.teacherKpiValue}>{classStudents.length}</Text>
            <Text style={styles.teacherKpiLabel}>TOTAL ALUNOS</Text>
          </View>

          <View style={styles.teacherKpiItem}>
            <BookOpen size={16} color="#a78bfa" />
            <Text style={styles.teacherKpiValue}>05</Text>
            <Text style={styles.teacherKpiLabel}>TURMAS (ADS)</Text>
          </View>

          <View style={styles.teacherKpiItem}>
            <AlertTriangle size={16} color={infrequentCount > 0 ? "#f87171" : "#4ade80"} />
            <Text style={[styles.teacherKpiValue, infrequentCount > 0 && styles.dangerBoldText]}>
              {infrequentCount}
            </Text>
            <Text style={styles.teacherKpiLabel}>EM RISCO (&gt;7d)</Text>
          </View>

          <View style={styles.teacherKpiItem}>
            <CheckCircle2 size={16} color="#4ade80" />
            <Text style={styles.teacherKpiValue}>{frequencyRate}%</Text>
            <Text style={styles.teacherKpiLabel}>FREQ. MÉDIA</Text>
          </View>
        </View>

        {/* 3. Seletor de Abas do Perfil Docente */}
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[
              styles.tabSelectorBtn,
              activeTeacherTab === "turmas" && styles.tabSelectorBtnActive,
            ]}
            onPress={() => setActiveTeacherTab("turmas")}
            activeOpacity={0.7}
          >
            <BookOpen
              size={13}
              color={activeTeacherTab === "turmas" ? "#ffffff" : "#a69abf"}
            />
            <Text
              style={[
                styles.tabSelectorText,
                activeTeacherTab === "turmas" && styles.tabSelectorTextActive,
              ]}
            >
              Turmas & Disciplinas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabSelectorBtn,
              activeTeacherTab === "institucional" && styles.tabSelectorBtnActive,
            ]}
            onPress={() => setActiveTeacherTab("institucional")}
            activeOpacity={0.7}
          >
            <ShieldCheck
              size={13}
              color={activeTeacherTab === "institucional" ? "#ffffff" : "#a69abf"}
            />
            <Text
              style={[
                styles.tabSelectorText,
                activeTeacherTab === "institucional" && styles.tabSelectorTextActive,
              ]}
            >
              Institucional
            </Text>
          </TouchableOpacity>
        </View>

        {/* ==================== ABA 1: TURMAS ==================== */}
        {activeTeacherTab === "turmas" && (
          <View style={styles.tabContentBox}>
            <Text style={styles.sectionHeaderTitle}>Turmas sob Responsabilidade (ADS)</Text>
            <Text style={styles.sectionHeaderDesc}>
              Acompanhamento de turmas e alunos matriculados no semestre 2026.1:
            </Text>

            {(["ADS 1", "ADS 2", "ADS 3", "ADS 4", "ADS 5"] as const).map((turmaName) => {
              const turmaCount = classStudents.filter((s) => s.turma === turmaName).length;
              const infrequentCount = classStudents.filter(
                (s) => s.turma === turmaName && s.lastActiveDaysAgo > 7
              ).length;

              return (
                <View key={turmaName} style={styles.disciplineCard}>
                  <View style={styles.disciplineTopRow}>
                    <View style={styles.disciplineIconBox}>
                      <BookOpen size={16} color="#a78bfa" />
                    </View>
                    <View style={styles.disciplineMeta}>
                      <Text style={styles.disciplineName}>{turmaName}</Text>
                      <Text style={styles.disciplineDetails}>
                        {turmaCount} {turmaCount === 1 ? "aluno matriculado" : "alunos matriculados"}
                      </Text>
                    </View>
                    {infrequentCount > 0 ? (
                      <View style={styles.disciplineHoursBadge}>
                        <Text style={styles.dangerBoldText}>
                          {infrequentCount} em risco
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.disciplineHoursBadge}>
                        <Text style={styles.disciplineHoursText}>
                          100% frequente
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* ==================== ABA 2: INSTITUCIONAL ==================== */}
        {activeTeacherTab === "institucional" && (
          <View style={styles.tabContentBox}>
            <Text style={styles.sectionHeaderTitle}>Credenciais & Vínculo Institucional</Text>
            <Text style={styles.sectionHeaderDesc}>
              Informações oficiais do corpo docente registradas na Faculdade CCI:
            </Text>

            <View style={styles.institutionalInfoCard}>
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Instituição:</Text>
                <Text style={styles.institutionalValue}>Faculdade CCI - Samambaia / DF</Text>
              </View>
              <View style={styles.institutionalDivider} />
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Curso Vinculado:</Text>
                <Text style={styles.institutionalValue}>Análise e Desenvolvimento de Sistemas (ADS)</Text>
              </View>
              <View style={styles.institutionalDivider} />
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Coordenação:</Text>
                <Text style={styles.institutionalValue}>Prof. Me. Anderson Silva</Text>
              </View>
              <View style={styles.institutionalDivider} />
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Regime de Trabalho:</Text>
                <Text style={styles.institutionalValue}>Horista / 20 Horas Semanais</Text>
              </View>
              <View style={styles.institutionalDivider} />
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Autenticação MFA:</Text>
                <Text style={styles.institutionalValueSuccess}>Ativo via Microsoft 365 Docente</Text>
              </View>
              <View style={styles.institutionalDivider} />
              <View style={styles.institutionalRow}>
                <Text style={styles.institutionalLabel}>Suporte de TI:</Text>
                <Text style={styles.institutionalValueLink}>ti@faculdadecci.com.br</Text>
              </View>
            </View>
          </View>
        )}

        {/* Ações do Docente no Rodapé */}
        <ButtonCustom
          title="Acessar Painel do Docente"
          variant="secondary"
          onPress={() => setCurrentTab("teacher")}
          icon={<GraduationCap size={16} color="#facc15" />}
          style={styles.teacherAdminBtn}
        />

        <ButtonCustom
          title="Sair da Conta"
          variant="danger"
          onPress={logout}
          icon={<LogOut size={16} color="#f87171" />}
          style={styles.logoutBtn}
        />
      </ScrollView>
    );
  }

  // ==================== VISÃO EXCLUSIVA DO ALUNO ====================
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Main Profile Card with 3D Avatar */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeaderRow}>
          {/* Avatar Display */}
          <View
            style={[
              styles.avatar3DBox,
              { borderColor: levelInfo.currentAvatar.accentColor },
            ]}
          >
            <Image
              source={levelInfo.currentAvatar.image}
              style={styles.avatar3DImage}
              resizeMode="cover"
            />
            <View
              style={[
                styles.avatarLevelBadge,
                { backgroundColor: levelInfo.currentAvatar.accentColor },
              ]}
            >
              <Text style={styles.avatarLevelBadgeText}>NV. {levelInfo.level}</Text>
            </View>
          </View>

          <View style={styles.profileMeta}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Marina Silva</Text>
              <Sparkles size={16} color="#f8c662" />
            </View>
            <Text style={styles.studentCourseText}>
              Análise e Desenvolvimento de Sistemas
            </Text>
            <Text style={styles.studentEmailText}>
              marina.silva@faculdadecci.com.br
            </Text>

            <View style={styles.profileMetaActions}>
              {/* Quick Heart Pill */}
              <TouchableOpacity
                style={styles.livesMiniPill}
                onPress={() => setActiveProfileTab("lives")}
                activeOpacity={0.7}
              >
                <Heart size={11} color="#ef4444" fill="#ef4444" />
                <Text style={styles.livesMiniText}>
                  {lives.toFixed(1).replace(".0", "")} / {maxLives} Vidas
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 2. Interactive Level Progress Bar Card (Contagem Cumulativa de XP) */}
        <View style={styles.levelProgressSection}>
          <View style={styles.levelHeaderRow}>
            <View style={styles.levelPillActive}>
              <Text style={styles.levelPillActiveText}>NÍVEL {levelInfo.level}</Text>
            </View>
            <Text style={styles.nextLevelGoalText}>
              Meta: {levelInfo.levelMaxXp.toLocaleString("pt-BR")} XP (Nível {levelInfo.level + 1})
            </Text>
          </View>

          {/* Big Progress Bar */}
          <View style={styles.mainProgressBarTrack}>
            <LinearGradient
              colors={levelInfo.currentAvatar.borderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.mainProgressBarFill, { width: `${levelInfo.progressPercent}%` }]}
            />
          </View>

          <View style={styles.levelFooterRow}>
            <Text style={styles.levelProgressLabel}>
              {levelInfo.totalXp.toLocaleString("pt-BR")} / {levelInfo.levelMaxXp.toLocaleString("pt-BR")} XP ({levelInfo.progressPercent}%)
            </Text>
            <Text style={styles.levelRemainingLabel}>
              {levelInfo.levelMaxXp - levelInfo.totalXp > 0
                ? `Faltam ${(levelInfo.levelMaxXp - levelInfo.totalXp).toLocaleString("pt-BR")} XP para subir!`
                : "Pronto para o próximo nível!"}
            </Text>
          </View>
        </View>

        {/* 3. Profile Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#443475" }]}>
              <Target size={16} color="#ae9aff" />
            </View>
            <Text style={styles.statBoxLabel}>MISSÕES</Text>
            <Text style={styles.statBoxValue}>18</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#55472a" }]}>
              <Trophy size={16} color="#f6c768" />
            </View>
            <Text style={styles.statBoxLabel}>BADGES</Text>
            <Text style={styles.statBoxValue}>05</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#55304c" }]}>
              <Flame size={16} color="#ff9b73" fill="#ff9b73" />
            </View>
            <Text style={styles.statBoxLabel}>STREAK</Text>
            <Text style={styles.statBoxValue}>12 dias</Text>
          </View>
        </View>
      </View>

      {/* Segmented Tabs Navigation */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[
            styles.tabSelectorBtn,
            activeProfileTab === "lives" && styles.tabSelectorBtnActive,
          ]}
          onPress={() => setActiveProfileTab("lives")}
          activeOpacity={0.7}
        >
          <Heart
            size={13}
            color={activeProfileTab === "lives" ? "#ef4444" : "#a69abf"}
            fill={activeProfileTab === "lives" ? "#ef4444" : "transparent"}
          />
          <Text
            style={[
              styles.tabSelectorText,
              activeProfileTab === "lives" && styles.tabSelectorTextActive,
            ]}
          >
            Vidas & Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabSelectorBtn,
            activeProfileTab === "badges" && styles.tabSelectorBtnActive,
          ]}
          onPress={() => setActiveProfileTab("badges")}
          activeOpacity={0.7}
        >
          <Trophy
            size={13}
            color={activeProfileTab === "badges" ? "#ffffff" : "#a69abf"}
          />
          <Text
            style={[
              styles.tabSelectorText,
              activeProfileTab === "badges" && styles.tabSelectorTextActive,
            ]}
          >
            Conquistas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabSelectorBtn,
            activeProfileTab === "avatars" && styles.tabSelectorBtnActive,
          ]}
          onPress={() => setActiveProfileTab("avatars")}
          activeOpacity={0.7}
        >
          <Sparkles
            size={13}
            color={activeProfileTab === "avatars" ? "#ffffff" : "#a69abf"}
          />
          <Text
            style={[
              styles.tabSelectorText,
              activeProfileTab === "avatars" && styles.tabSelectorTextActive,
            ]}
          >
            Avatares 3D
          </Text>
        </TouchableOpacity>
      </View>

      {/* ==================== TAB 1: AVATARES 3D ==================== */}
      {activeProfileTab === "avatars" && (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Coleção de Avatares 3D ({levelInfo.unlockedAvatars.length}/{levelInfo.allAvatars.length})
            </Text>
            <Text style={styles.sectionSubtitle}>
              Toque em qualquer avatar para ver em tela cheia com seus atributos e história
            </Text>
          </View>

          {/* Avatars Grid */}
          <View style={styles.avatarsGrid}>
            {levelInfo.allAvatars.map((avatar) => {
              const isUnlocked = levelInfo.level >= avatar.levelRequired;
              const isSelected = levelInfo.currentAvatar.id === avatar.id;

              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarCard,
                    isSelected && styles.avatarCardSelected,
                    !isUnlocked && styles.avatarCardLocked,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setInspectAvatar(avatar)}
                >
                  <View
                    style={[
                      styles.avatarCardImageWrapper,
                      { borderColor: avatar.accentColor },
                    ]}
                  >
                    <Image
                      source={avatar.image}
                      style={styles.avatarCardImage}
                      resizeMode="cover"
                    />

                    {!isUnlocked && (
                      <View style={styles.lockedBadge}>
                        <Lock size={14} color="#ffffff" />
                      </View>
                    )}

                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <CheckCircle2 size={12} color="#ffffff" />
                      </View>
                    )}
                  </View>

                  <Text style={styles.avatarCardName} numberOfLines={1}>
                    {avatar.name}
                  </Text>
                  <Text style={styles.avatarCardTag}>{avatar.tag}</Text>

                  {isUnlocked ? (
                    <TouchableOpacity
                      style={[
                        styles.equipButton,
                        isSelected ? styles.equipButtonActive : styles.equipButtonInactive,
                      ]}
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedAvatarId(avatar.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.equipButtonText,
                          isSelected && styles.equipButtonTextActive,
                        ]}
                      >
                        {isSelected ? "EQUIPADO" : "EQUIPAR"}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.lockedRequirementBox}>
                      <Text style={styles.lockedRequirementText}>
                        Nv. {avatar.levelRequired} ({((avatar.levelRequired - 1) * 2000).toLocaleString("pt-BR")} XP)
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* ==================== TAB 2: CONQUISTAS ==================== */}
      {activeProfileTab === "badges" && (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suas Conquistas</Text>
            <Text style={styles.sectionSubtitle}>
              Troféus e insígnias conquistadas na sua jornada como dev
            </Text>
          </View>

          <View style={styles.badgesList}>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: "#4c2882" }]}>
                <Award size={20} color="#c4b2ff" />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.badgeName}>Primeiro Desafio</Text>
                <Text style={styles.badgeDesc}>Concluiu a primeira fase de Lógica de Programação</Text>
              </View>
              <ShieldCheck size={18} color="#4ade80" />
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: "#3a4a28" }]}>
                <Flame size={20} color="#a3e635" />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.badgeName}>Fogo nos Estudos</Text>
                <Text style={styles.badgeDesc}>12 dias consecutivos de login e exercícios</Text>
              </View>
              <ShieldCheck size={18} color="#4ade80" />
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: "#2e3b5e" }]}>
                <Zap size={20} color="#60a5fa" />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.badgeName}>Caçador de Bugs</Text>
                <Text style={styles.badgeDesc}>Encontrou o erro no terminal na primeira tentativa</Text>
              </View>
              <ShieldCheck size={18} color="#4ade80" />
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: "#52243d" }]}>
                <Heart size={20} color="#f43f5e" fill="#f43f5e" />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.badgeName}>Sobrevivente Focado</Text>
                <Text style={styles.badgeDesc}>Completou uma trilha com os 3 corações intactos</Text>
              </View>
              <ShieldCheck size={18} color="#4ade80" />
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: "#4c3a1e" }]}>
                <Trophy size={20} color="#fbbf24" />
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.badgeName}>Mestre de Nível</Text>
                <Text style={styles.badgeDesc}>Alcançou o nível 3 acumulando mais de 4.000 XP</Text>
              </View>
              <ShieldCheck size={18} color="#4ade80" />
            </View>
          </View>
        </View>
      )}

      {/* ==================== TAB 3: VIDAS & STATUS ==================== */}
      {activeProfileTab === "lives" && (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sistema de Vidas</Text>
            <Text style={styles.sectionSubtitle}>
              Mantenha o foco nos desafios para não perder seus corações
            </Text>
          </View>

          {/* Big Lives Status Card */}
          <View style={styles.livesCard}>
            <View style={styles.livesCardHeader}>
              <View>
                <Text style={styles.livesCardTitle}>Status dos Corações</Text>
                <Text style={styles.livesCardSubtitle}>
                  {lives >= 3
                    ? "Vida Cheia! Pronto para enfrentar qualquer desafio."
                    : lives > 0
                    ? "Cuidado! Vidas consumidas por erros recentes."
                    : "Sem vidas! Aguarde a recarga para voltar a jogar."}
                </Text>
              </View>
              <HeartDisplay lives={lives} size={24} />
            </View>

            <View style={styles.livesCountRow}>
              <Text style={styles.livesCountNumber}>{lives.toFixed(1).replace(".0", "")}</Text>
              <Text style={styles.livesCountMax}>/ {maxLives} Corações</Text>
            </View>

            {/* Recharge Timer Box */}
            <View style={styles.rechargeBox}>
              <Clock size={16} color="#fca5a5" />
              <View style={styles.flexItem}>
                <Text style={styles.rechargeBoxTitle}>Recarga de Vidas Automática</Text>
                <Text style={styles.rechargeBoxDesc}>
                  Tempo estimado para restauração completa: <Text style={styles.whiteBoldText}>{rechargeHoursRemaining}</Text>
                </Text>
              </View>
            </View>

            {/* Rule Explanations */}
            <View style={styles.livesRulesList}>
              <View style={styles.livesRuleItem}>
                <Text style={styles.livesRuleDot}>•</Text>
                <Text style={styles.livesRuleText}>
                  Cada usuário inicia com <Text style={styles.whiteBoldText}>3 corações cheios</Text>.
                </Text>
              </View>
              <View style={styles.livesRuleItem}>
                <Text style={styles.livesRuleDot}>•</Text>
                <Text style={styles.livesRuleText}>
                  Erros em mini-games (ordenação, caça ao bug ou quiz) consomem <Text style={styles.dangerBoldText}>meio coração (-0.5 vida)</Text>.
                </Text>
              </View>
              <View style={styles.livesRuleItem}>
                <Text style={styles.livesRuleDot}>•</Text>
                <Text style={styles.livesRuleText}>
                  Ao zerar todas as vidas, o app solicita uma pausa de estudo de algumas horas para recarregar sua energia mental.
                </Text>
              </View>
            </View>

            {/* Testing Actions Row using ButtonCustom */}
            <View style={styles.livesTestActions}>
              <ButtonCustom
                title="Simular Dano (-0.5)"
                variant="danger"
                onPress={() => loseLife(0.5)}
                style={styles.testBtnFlex}
              />
              <ButtonCustom
                title="Recarregar (3.0)"
                variant="success"
                onPress={rechargeLives}
                icon={<RotateCcw size={13} color="#ffffff" />}
                style={styles.testBtnFlex}
              />
            </View>
          </View>
        </View>
      )}

      {/* Logout Action using ButtonCustom (Critério 4: Componentização) */}
      <ButtonCustom
        title="Sair da Conta"
        variant="danger"
        onPress={logout}
        icon={<LogOut size={16} color="#f87171" />}
        style={styles.logoutBtn}
      />

      {/* 3D Avatar Modal Inspection */}
      <Modal
        visible={inspectAvatar !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setInspectAvatar(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setInspectAvatar(null)}
            >
              <X size={18} color="#ffffff" />
            </TouchableOpacity>

            {inspectAvatar && (
              <View style={styles.modalBodyCentered}>
                {/* 3D Avatar Large Render */}
                <View
                  style={[
                    styles.modalAvatarBox,
                    { borderColor: inspectAvatar.accentColor },
                  ]}
                >
                  <Image
                    source={inspectAvatar.image}
                    style={styles.modalAvatarImage}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.modalLevelTag,
                      { backgroundColor: inspectAvatar.accentColor },
                    ]}
                  >
                    <Text style={styles.modalLevelTagText}>
                      NÍVEL {inspectAvatar.levelRequired}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalAvatarName}>{inspectAvatar.name}</Text>
                <Text style={styles.modalAvatarTitle}>{inspectAvatar.title}</Text>
                <Text style={styles.modalAvatarDesc}>{inspectAvatar.description}</Text>

                {/* Lore & Story Box */}
                <View style={styles.modalLoreBox}>
                  <View style={styles.modalLoreHeader}>
                    <Sparkles size={14} color="#facc15" />
                    <Text style={styles.modalLoreTitle}>História do Personagem</Text>
                  </View>
                  <Text style={styles.modalLoreText}>{inspectAvatar.lore}</Text>

                  <View style={styles.modalPerkBadge}>
                    <ShieldCheck size={14} color="#4ade80" />
                    <Text style={styles.modalPerkText}>{inspectAvatar.perk}</Text>
                  </View>
                </View>

                {/* Equip Action Button in Modal (Critério 4: Componentização) */}
                {levelInfo.level >= inspectAvatar.levelRequired ? (
                  <ButtonCustom
                    title={
                      levelInfo.currentAvatar.id === inspectAvatar.id
                        ? "AVATAR JÁ EQUIPADO"
                        : "EQUIPAR ESTE AVATAR"
                    }
                    variant={levelInfo.currentAvatar.id === inspectAvatar.id ? "secondary" : "primary"}
                    onPress={() => {
                      setSelectedAvatarId(inspectAvatar.id);
                      setInspectAvatar(null);
                    }}
                    disabled={levelInfo.currentAvatar.id === inspectAvatar.id}
                    style={styles.modalEquipBtnCustom}
                  />
                ) : (
                  <View style={styles.modalLockedBox}>
                    <Lock size={15} color="#cbd5e1" />
                    <Text style={styles.modalLockedText}>
                      Bloqueado: requer Nível {inspectAvatar.levelRequired} ({((inspectAvatar.levelRequired - 1) * 2000).toLocaleString("pt-BR")} XP)
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#160d2e",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  // Profile Card
  profileCard: {
    backgroundColor: "#211440",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar3DBox: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 22,
    borderWidth: 2.5,
    backgroundColor: "#160d2e",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar3DImage: {
    width: "100%",
    height: "100%",
  },
  avatarLevelBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLevelBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#0f0826",
    letterSpacing: 0.5,
  },
  inspectHintBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileMeta: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.4,
  },
  studentCourseText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#c4b5fd",
    marginTop: 2,
  },
  studentEmailText: {
    fontSize: 11,
    color: "#94a3b8",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginTop: 2,
  },
  avatarTitleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f8c662",
    marginTop: 2,
  },
  userRole: {
    fontSize: 11,
    color: "#a69aba",
    marginTop: 2,
  },
  profileMetaActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  viewAvatarPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(248, 198, 98, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(248, 198, 98, 0.35)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  viewAvatarPillText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#f8c662",
  },
  livesMiniPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  livesMiniText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#fca5a5",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  // Level Progress Section
  levelProgressSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "rgba(15, 8, 38, 0.6)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  levelHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  levelPillActive: {
    backgroundColor: "#6b4ee8",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  levelPillActiveText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  nextLevelGoalText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "#a69bbf",
  },
  mainProgressBarTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  mainProgressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  levelFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  levelProgressLabel: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10,
    fontWeight: "700",
    color: "#edeaff",
  },
  levelRemainingLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#f8c662",
  },

  // Stats Row
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 10,
  },
  statIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  statBoxLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#a69bbf",
    letterSpacing: 0.8,
  },
  statBoxValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 2,
  },

  // Segmented Tab Selector
  tabSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 4,
    marginTop: 20,
    marginBottom: 6,
  },
  tabSelectorBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 9,
    borderRadius: 12,
  },
  tabSelectorBtnActive: {
    backgroundColor: "#6b4ee8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabSelectorText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#a69abf",
  },
  tabSelectorTextActive: {
    color: "#ffffff",
  },

  // Section Header
  sectionHeader: {
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#968aa9",
    marginTop: 2,
  },

  // Avatars Grid
  avatarsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  avatarCard: {
    width: "48%",
    backgroundColor: "#211440",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 12,
    alignItems: "center",
  },
  avatarCardSelected: {
    borderColor: "#a855f7",
    backgroundColor: "rgba(76, 29, 149, 0.35)",
  },
  avatarCardLocked: {
    opacity: 0.7,
  },
  avatarCardImageWrapper: {
    position: "relative",
    width: 72,
    height: 72,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: "#160d2e",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarCardImage: {
    width: "100%",
    height: "100%",
  },
  lockedBadge: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#a855f7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCardName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  avatarCardTag: {
    fontSize: 9.5,
    color: "#a69bbf",
    marginTop: 2,
    marginBottom: 8,
  },
  equipButton: {
    width: "100%",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  equipButtonActive: {
    backgroundColor: "rgba(168, 85, 247, 0.25)",
    borderWidth: 1,
    borderColor: "#a855f7",
  },
  equipButtonInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  equipButtonText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#d1c4e9",
    letterSpacing: 0.5,
  },
  equipButtonTextActive: {
    color: "#f3e8ff",
  },
  lockedRequirementBox: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    alignItems: "center",
  },
  lockedRequirementText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#94a3b8",
  },

  // Badges
  badgesList: {
    gap: 10,
  },
  badgeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#211440",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    gap: 10,
  },
  badgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeName: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#ffffff",
  },
  badgeDesc: {
    fontSize: 10,
    color: "#968aa9",
    marginTop: 1,
  },

  // Lives Tab Styling
  livesCard: {
    backgroundColor: "#211440",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    padding: 16,
  },
  livesCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  livesCardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
  },
  livesCardSubtitle: {
    fontSize: 10.5,
    color: "#a69abf",
    marginTop: 2,
    maxWidth: 200,
  },
  livesCountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 14,
  },
  livesCountNumber: {
    fontSize: 32,
    fontWeight: "900",
    color: "#f87171",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  livesCountMax: {
    fontSize: 13,
    fontWeight: "700",
    color: "#968aa9",
  },
  rechargeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  rechargeBoxTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fca5a5",
  },
  rechargeBoxDesc: {
    fontSize: 10,
    color: "#c9bfe3",
    marginTop: 1,
  },
  livesRulesList: {
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  livesRuleItem: {
    flexDirection: "row",
    gap: 8,
  },
  livesRuleDot: {
    fontSize: 12,
    color: "#f87171",
    fontWeight: "900",
  },
  livesRuleText: {
    flex: 1,
    fontSize: 10.5,
    color: "#c5bdda",
    lineHeight: 15,
  },
  livesTestActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  testLoseLifeBtn: {
    flex: 1,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  testLoseLifeBtnText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fca5a5",
  },
  testRechargeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#10b981",
    paddingVertical: 9,
    borderRadius: 10,
  },
  testRechargeBtnText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 22,
  },
  logoutButtonText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#f87171",
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 5, 25, 0.88)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    position: "relative",
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#20133e",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(141, 117, 243, 0.3)",
    padding: 22,
    alignItems: "center",
  },
  modalCloseBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalAvatarBox: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: "#160d2e",
    overflow: "hidden",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  modalAvatarImage: {
    width: "100%",
    height: "100%",
  },
  modalLevelTag: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 3,
    alignItems: "center",
  },
  modalLevelTagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#0c0620",
    letterSpacing: 0.5,
  },
  modalAvatarName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.4,
  },
  modalAvatarTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#facc15",
    marginTop: 2,
  },
  modalAvatarDesc: {
    fontSize: 11,
    color: "#c9c2e0",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  modalLoreBox: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 12,
    marginTop: 14,
  },
  modalLoreHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  modalLoreTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#facc15",
  },
  modalLoreText: {
    fontSize: 10.5,
    color: "#b9afd4",
    lineHeight: 15,
  },
  modalPerkBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(74, 222, 128, 0.12)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 8,
  },
  modalPerkText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4ade80",
  },
  modalEquipBtn: {
    width: "100%",
    backgroundColor: "#6b4ee8",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },
  modalEquipBtnSelected: {
    backgroundColor: "rgba(107, 78, 232, 0.4)",
    borderWidth: 1,
    borderColor: "#6b4ee8",
  },
  modalEquipBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  modalLockedBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 18,
  },
  modalLockedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#cbd5e1",
  },
  avatarNameBold: {
    color: "#ffffff",
    fontWeight: "700",
  },
  flexItem: {
    flex: 1,
  },
  whiteBoldText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  dangerBoldText: {
    color: "#fca5a5",
    fontWeight: "700",
  },
  testBtnFlex: {
    flex: 1,
    paddingVertical: 10,
  },
  logoutBtn: {
    marginTop: 26,
  },
  modalBodyCentered: {
    alignItems: "center",
    width: "100%",
  },
  modalEquipBtnCustom: {
    marginTop: 18,
    width: "100%",
  },
  // Teacher Profile Card
  teacherProfileCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    marginBottom: 16,
  },
  teacherCardGradient: {
    padding: 20,
  },
  teacherHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  teacherAvatarBox: {
    position: "relative",
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "rgba(250, 204, 21, 0.12)",
    borderWidth: 2,
    borderColor: "#facc15",
    alignItems: "center",
    justifyContent: "center",
  },
  teacherStatusDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4ade80",
    borderWidth: 2,
    borderColor: "#190c38",
  },
  teacherMetaCol: {
    flex: 1,
  },
  teacherNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  teacherRoleTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#facc15",
    marginTop: 3,
  },
  teacherDepartment: {
    fontSize: 11,
    color: "#c4b5fd",
    marginTop: 2,
  },
  teacherBadgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  teacherBadgePill: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  teacherBadgePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#cbd5e1",
  },
  teacherBadgePillActive: {
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.3)",
  },
  teacherBadgePillActiveText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#4ade80",
  },
  teacherEmailBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  teacherEmailText: {
    fontSize: 11.5,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#e2e8f0",
  },

  // Teacher KPIs
  teacherKpiGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  teacherKpiItem: {
    flex: 1,
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  teacherKpiValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
    marginTop: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  teacherKpiLabel: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#94a3b8",
    marginTop: 2,
    textAlign: "center",
  },

  // Tab Content Box
  tabContentBox: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.2,
  },
  sectionHeaderDesc: {
    fontSize: 11.5,
    color: "#94a3b8",
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 16,
  },

  // Disciplines
  disciplineCard: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    marginBottom: 10,
  },
  disciplineTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  disciplineIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(167, 139, 250, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  disciplineIconBoxBlue: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  disciplineIconBoxYellow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  disciplineMeta: {
    flex: 1,
  },
  disciplineName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
  },
  disciplineDetails: {
    fontSize: 10.5,
    color: "#94a3b8",
    marginTop: 2,
  },
  disciplineHoursBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  disciplineHoursText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#c4b5fd",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  disciplineFooter: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  disciplineFooterText: {
    fontSize: 10.5,
    color: "#4ade80",
    fontWeight: "600",
  },

  // Quizzes
  tabTitleRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  addQuizHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#7c3aed",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addQuizHeaderBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
  },
  teacherQuizCard: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    marginBottom: 10,
  },
  teacherQuizCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  quizTrackBadge: {
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.4)",
  },
  quizTrackBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#c4b5fd",
  },
  quizXpBadge: {
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  quizXpBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#facc15",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  teacherQuizQuestionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 18,
    marginBottom: 8,
  },
  quizCorrectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 4,
  },
  quizCorrectText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4ade80",
  },
  quizExplanationText: {
    fontSize: 10.5,
    color: "#94a3b8",
    fontStyle: "italic",
    marginTop: 4,
    lineHeight: 15,
  },
  emptyStateBox: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 24,
    alignItems: "center",
    marginTop: 8,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 12,
  },
  emptyStateDesc: {
    fontSize: 11.5,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 16,
  },
  emptyStateBtn: {
    width: "100%",
  },

  // Institutional Info
  institutionalInfoCard: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
  },
  institutionalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  institutionalLabel: {
    fontSize: 11.5,
    color: "#94a3b8",
    fontWeight: "600",
  },
  institutionalValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  institutionalValueSuccess: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4ade80",
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  institutionalValueLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38bdf8",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  institutionalDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  teacherAdminBtn: {
    marginTop: 26,
    width: "100%",
  },
});
