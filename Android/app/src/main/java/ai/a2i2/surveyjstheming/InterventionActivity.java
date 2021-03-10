package ai.a2i2.surveyjstheming;

import android.os.Bundle;

import androidx.appcompat.content.res.AppCompatResources;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.FragmentActivity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import static ai.a2i2.surveyjstheming.MainActivity.INTERVENTION_LIST;

public class InterventionActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intervention);

        String interventionKey = getIntent().getStringExtra("INTERVENTION");

        final Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setNavigationIcon(AppCompatResources.getDrawable(this, R.drawable.abc_ic_ab_back_material));
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
        toolbar.setTitle(interventionKey);

        try {
            String interventionPath = INTERVENTION_LIST.get(interventionKey);
            InputStream inputStream = getApplicationContext().getAssets().open("INTERVENTIONS" + interventionPath);
            StringBuilder textBuilder = new StringBuilder();
            try (Reader reader = new BufferedReader(new InputStreamReader
                    (inputStream, Charset.forName(StandardCharsets.UTF_8.name())))) {
                int c = 0;
                while ((c = reader.read()) != -1) {
                    textBuilder.append((char) c);
                }
            }
            createInterventionFragment(textBuilder.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void createInterventionFragment(final String htmlContent) {
        final InterventionFragment fragment = InterventionFragment.newInstance(htmlContent);

        if (!isFinishing() || !isDestroyed()) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.recommendation_fragment, fragment)
                    .commit();
        }
    }
}