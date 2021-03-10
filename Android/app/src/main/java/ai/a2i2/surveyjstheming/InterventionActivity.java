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

        String interventionPath = INTERVENTION_LIST.get(interventionKey);
        createInterventionFragment("INTERVENTIONS" + interventionPath);
    }

    private void createInterventionFragment(final String indexPath) {
        final InterventionFragment fragment = InterventionFragment.newInstance(indexPath);

        if (!isFinishing() || !isDestroyed()) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.recommendation_fragment, fragment)
                    .commit();
        }
    }
}