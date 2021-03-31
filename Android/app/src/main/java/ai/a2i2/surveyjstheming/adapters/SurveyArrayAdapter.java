package ai.a2i2.surveyjstheming.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.RecyclerView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import ai.a2i2.surveyjstheming.SurveyDialogFragment;
import ai.a2i2.surveyjstheming.SurveyListFragment;
import ai.a2i2.surveyjstheming.databinding.ListItemBinding;

public class SurveyArrayAdapter extends RecyclerView.Adapter<SurveyArrayAdapter.SurveyViewHolder> {

    private final SurveyListFragment fragment;
    private final ArrayList<String> itemList;

    public SurveyArrayAdapter(@NonNull final SurveyListFragment fragment, @NonNull final ArrayList<String> itemList) {
        this.fragment = fragment;
        this.itemList = itemList;
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    @NonNull
    @Override
    public SurveyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new SurveyViewHolder(ListItemBinding.inflate(LayoutInflater.from(parent.getContext())));
    }

    @Override
    public void onBindViewHolder(final SurveyViewHolder holder, final int listPosition) {
        holder.binding.rowItem.setText(itemList.get(listPosition));
    }

    class SurveyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ListItemBinding binding;

        SurveyViewHolder(@NonNull ListItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            // Load the survey file content as a String and launch the survey dialog
            try {
                InputStream inputStream = fragment.requireContext().getAssets().open("SurveyJS/Files/" + binding.rowItem.getText());
                StringBuilder textBuilder = new StringBuilder();
                try (Reader reader = new BufferedReader(new InputStreamReader
                        (inputStream, Charset.forName(StandardCharsets.UTF_8.name())))) {
                    int c;
                    while ((c = reader.read()) != -1) {
                        textBuilder.append((char) c);
                    }
                }
                createSurveyDialog(fragment.getChildFragmentManager(), textBuilder.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        private void createSurveyDialog(final FragmentManager fragmentManager, String surveyJson) {
            final SurveyDialogFragment dialog = SurveyDialogFragment.newInstance(surveyJson);
            if (dialog != null) {
                dialog.show(fragmentManager, dialog.getTag());
            }
        }
    }
}
