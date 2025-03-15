import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Program, CurriculumWeek, ScheduleSession, PositionSession } from '@/types/program';
import React from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
  formSection: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  formField: {
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666666',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  metricBox: {
    width: '45%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  notes: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
  }
});

// Program PDF Template
export const ProgramPDF: React.FC<{ program: Program; position?: string }> = ({ program, position }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{program.title}</Text>
        {position && <Text style={styles.subtitle}>{position} Specific Training</Text>}
        <Text style={styles.subtitle}>Duration: {program.duration}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Program Overview</Text>
        <Text style={styles.text}>{program.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Program Details</Text>
        <Text style={styles.text}>Age Group: {program.ageGroup}</Text>
        <Text style={styles.text}>Skill Level: {program.skillLevel}</Text>
        <Text style={styles.text}>Max Participants: {program.maxParticipants}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment Required</Text>
        {program.equipment.map((item, index) => (
          <Text key={index} style={styles.text}>• {item}</Text>
        ))}
      </View>

      {position && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{position} Specific Training</Text>
          {program.positionSpecificSessions
            .filter(session => session.position === position)
            .map((session, index) => (
              <View key={index}>
                <Text style={styles.text}>{session.description}</Text>
                {session.drills.map((drill, i) => (
                  <Text key={i} style={styles.text}>• {drill}</Text>
                ))}
              </View>
            ))}
        </View>
      )}
    </Page>
  </Document>
);

// Progress Tracking Form Template
export const ProgressTrackingPDF: React.FC<{ program: Program }> = ({ program }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Progress Tracking Form</Text>
        <Text style={styles.subtitle}>{program.title}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Player Information</Text>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Player Name: _______________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Week Number: _____ Date: ___________</Text>
        </View>
      </View>

      {program.progressTracking && (
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Weekly Metrics</Text>
          <View style={styles.metricsGrid}>
            {program.progressTracking.weekly.map((metric, index) => (
              <View key={index} style={styles.metricBox}>
                <Text style={styles.formLabel}>{metric}</Text>
                <Text style={styles.formLabel}>Rating (1-5): ____</Text>
                <Text style={styles.formLabel}>Notes: __________</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.notes}>
        <Text style={styles.sectionTitle}>Coach's Notes</Text>
        <Text style={styles.text}>Areas of Excellence:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Areas for Improvement:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
      </View>
    </Page>
  </Document>
);

// Player Evaluation Form Template
export const PlayerEvaluationPDF: React.FC<{ program: Program }> = ({ program }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Player Evaluation Form</Text>
        <Text style={styles.subtitle}>{program.title}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Player Details</Text>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Name: _______________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Position: ____________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Evaluation Date: _____________</Text>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Technical Abilities</Text>
        <View style={styles.metricsGrid}>
          {[
            "Ball Control",
            "Passing Accuracy",
            "First Touch",
            "Shooting",
            "Dribbling",
            "Heading"
          ].map((skill, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.formLabel}>{skill}</Text>
              <Text style={styles.formLabel}>Rating (1-5): ____</Text>
              <Text style={styles.formLabel}>Comments: ________</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.notes}>
        <Text style={styles.sectionTitle}>Development Plan</Text>
        <Text style={styles.text}>Key Strengths:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Priority Development Areas:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Recommended Actions:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
      </View>
    </Page>
  </Document>
);